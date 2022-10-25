package com.marshmallow.diary.service;

import com.marshmallow.diary.dto.DiaryRequest;
import com.marshmallow.diary.dto.DiaryResponse;
import com.marshmallow.diary.entity.Diary;
import com.marshmallow.diary.repository.DiaryRepository;
import com.marshmallow.user.entity.User;
import com.marshmallow.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DiaryService {

    private final DiaryRepository diaryRepository;
    private final UserRepository userRepository;

    private final AwsS3Service awsS3Service;
    public DiaryResponse.Regist registDiary(DiaryRequest.Create request , List<MultipartFile> multipartFile){

        User user = userRepository.findById(UUID.fromString("18343747-03f9-414f-b7f2-30090b8954e8")).get();
        String photos = null;
        if(multipartFile != null){
            List<String> photo = awsS3Service.uploadFile(multipartFile);
            photos = photo.toString();
        }
        Diary diary = Diary.DiaryCreate(user, request, photos);
        UUID diaryId = diaryRepository.save(diary).getDiaryId();
        DiaryResponse.Regist response = DiaryResponse.Regist.build(diaryId);

        /*
          분석 결과 저장하는 코드 추가해야 합니다.
         */

        return response;


    }

    public DiaryResponse.Detail getDetailDiary(UUID diaryId) {
        Diary diary = diaryRepository.findById(diaryId).get();
        if(diary == null){
            return null;
        }
        String photo = diary.getPhoto();
        photo = photo.substring(1, photo.length()-1);
        String[] photos = photo.split(", ");
        return DiaryResponse.Detail.build(diary, photos);
    }
}
