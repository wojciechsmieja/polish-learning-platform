package pl.eduapp.learning_platform.mapper;

import org.mapstruct.Mapper;
import pl.eduapp.learning_platform.dto.RegisterRequest;
import pl.eduapp.learning_platform.dto.UserDTO;
import pl.eduapp.learning_platform.entity.User;

@Mapper(componentModel="spring")
public interface UserMapper {
    //map entity to dto
    UserDTO toDTO(User user);
    //map dto to entity
    User toEntity(RegisterRequest request);
}
