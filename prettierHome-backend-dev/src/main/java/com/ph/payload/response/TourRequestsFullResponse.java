package com.ph.payload.response;

import com.ph.domain.enums.Status;
import lombok.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class  TourRequestsFullResponse implements Serializable {

    private Long id;
    private LocalDate tourDate;
    private LocalTime tourTime;
    private AdvertResponseForTourRequest advert;
    private UserResponse ownerUser;
    private UserResponse guestUser;
    private Status status;
    private List<ImageResponse> images;

}
