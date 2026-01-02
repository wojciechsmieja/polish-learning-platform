package pl.eduapp.learning_platform.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import pl.eduapp.learning_platform.dto.*;
import pl.eduapp.learning_platform.entity.*;

@Mapper(componentModel = "spring")
public interface TaskMapper {
    //entity to dto
    @Mapping(source = "createdBy.id", target="createdById")
    @Mapping(source = "createdBy.username", target="createdByUsername")
    TaskResponseDTO toDTO(Task task);

    @Mapping(target="createdBy", ignore = true)
    Task toEntity(TaskRequestDTO dto);

    //entityToDto to send this to front
    TaskQuizDetailResponseDTO toQuizDetailDTO(TaskQuizDetail dto);
    TaskQuizOptionResponseDTO toQuizOptionDTO(TaskQuizOption dto);
    TaskSentenceResponseDTO toSentenceDTO(TaskSentenceDetail dto);
    TaskAnalysisDetailResponseDTO toAnalysisDTO(TaskAnalysisDetail dto);
    TaskShortResponse toShortDTO(Task dto);
}
