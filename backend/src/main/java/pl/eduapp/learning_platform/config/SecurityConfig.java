package pl.eduapp.learning_platform.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;
    private final UserDetailsService userDetailsService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(Customizer.withDefaults())
                .csrf(customizer->customizer.disable())
                .sessionManagement(session ->
                    session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        //below we can define who has access to varius endpoints
                .authorizeHttpRequests(auth -> auth
                        //authorization
                        .requestMatchers("/api/auth/**", "/api/auth/register/**").permitAll()
                        //getTasks
                        .requestMatchers(HttpMethod.POST, "/api/tasks/create").hasAnyRole("ADMIN", "TEACHER")
                        .requestMatchers("/api/tasks/my").authenticated()
                        .requestMatchers("/api/tasks/public/**").permitAll()
                        .requestMatchers(HttpMethod.PATCH, "/api/tasks/**").hasAnyRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/tasks/**").hasAnyRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/tasks/admin/all").hasAnyRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/tasks/{id}").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/tasks/{id}/leaderboard").permitAll()
                        //progress
                        .requestMatchers(HttpMethod.POST, "/api/progress/submit").permitAll()
                        .requestMatchers("/api/progress/**").authenticated()
                        //profiles
                        .requestMatchers(HttpMethod.GET,"/api/profile/user/**").permitAll()
                        .requestMatchers("/api/profile/**").authenticated()
                        //classes
                        .requestMatchers(HttpMethod.POST, "/api/classes/create").hasRole("TEACHER")
                        .requestMatchers(HttpMethod.GET, "/api/classes/teacher").hasRole("TEACHER")
                        .requestMatchers(HttpMethod.GET, "/api/classes/{id}/details").hasRole("TEACHER")
                        .requestMatchers(HttpMethod.GET, "/api/classes/student").hasRole("STUDENT")
                        .requestMatchers(HttpMethod.POST, "/api/classes/join").hasRole("STUDENT")
                        //rest
                    .anyRequest().authenticated()
        )
                .authenticationProvider(authenticationProvider())
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        // Pozwalamy na Twoją aplikację React
        configuration.setAllowedOrigins(List.of("http://localhost:5173"));

        // Pozwalamy na wszystkie metody HTTP (GET, POST, PUT, DELETE, OPTIONS)
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));

        // Pozwalamy na wszystkie nagłówki (w tym Authorization dla tokena JWT)
        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type", "Cache-Control"));

        // Pozwalamy na przesyłanie ciasteczek/autoryzacji
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }


}