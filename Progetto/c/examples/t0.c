#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>

#define STB_IMAGE_IMPLEMENTATION
#include "stb_image/stb_image.h"
#define STB_IMAGE_WRITE_IMPLEMENTATION
#include "stb_image/stb_image_write.h"

int main(void) {
    int width, height, channels;
    uint8_t *img = stbi_load("sky.jpg", &width, &height, &channels, 0);

    if(img == NULL) {
        printf("Error loading the image\n");
        exit(1);
    }

    printf("Loaded image with %dpx width, %dpx height, %d channels\n", width, height, channels);
    stbi_write_png("sky.png", width, height, channels, img, width * channels);
    stbi_write_jpg("sky_2.jpg", width, height, channels, img, 100);

    stbi_image_free(img);
}