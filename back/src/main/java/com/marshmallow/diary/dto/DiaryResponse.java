package com.marshmallow.diary.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.marshmallow.diary.entity.Diary;
import lombok.*;

import java.util.Date;
import java.util.List;
import java.util.UUID;

public class DiaryResponse {
    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class Regist{

        private UUID diaryId;

        public static DiaryResponse.Regist build(UUID diaryId){
            return Regist.builder()
                    .diaryId(diaryId)
                    .build();
        }
    }

    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class Detail{
        private UUID diaryId;
        private String title;
        private String content;
        private int weather;
        private String[] photo;
        @JsonFormat(pattern = "yyyy-MM-dd" )
        private Date date;

        public static DiaryResponse.Detail build(Diary diary, String[] photo){
            return Detail.builder()
                    .diaryId(diary.getDiaryId())
                    .title(diary.getTitle())
                    .content(diary.getContent())
                    .weather(diary.getWeather())
                    .photo(photo)
                    .date(diary.getDate())
                    .build();
        }
    }

}