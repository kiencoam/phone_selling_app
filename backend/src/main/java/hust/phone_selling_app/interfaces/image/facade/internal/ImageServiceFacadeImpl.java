package hust.phone_selling_app.interfaces.image.facade.internal;

import org.springframework.stereotype.Service;

import hust.phone_selling_app.domain.image.ImageRepository;
import hust.phone_selling_app.interfaces.image.facade.ImageServiceFacade;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ImageServiceFacadeImpl implements ImageServiceFacade {

    private final ImageRepository imageRepository;

    @Override
    public void delete(String id) {
        imageRepository.delete(id);
    }

}
