package pl.eduapp.learning_platform.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import pl.eduapp.learning_platform.dto.TaskRequestDTO;
import pl.eduapp.learning_platform.dto.TaskResponseDTO;
import pl.eduapp.learning_platform.entity.Task;

@Mapper(componentModel = "spring")
public interface TaskMapper {
    //entity to dto
    @Mapping(source = "createdBy.id", target="createdById")
    @Mapping(source = "createdBy.username", target="createdByUsername")
    TaskResponseDTO toDTO(Task task);

    @Mapping(target="createdBy", ignore = true)
    Task toEntity(TaskRequestDTO dto);
}
