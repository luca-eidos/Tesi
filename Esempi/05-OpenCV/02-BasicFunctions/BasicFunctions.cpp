#define OPENCV_DISABLE_THREAD_SUPPORT 

#include <stdio.h>
#include <stdlib.h>
#include <opencv2/opencv.hpp>

using namespace cv;
using namespace std;

int main(int argc, char **argv)
{
    if (argc != 2)
    {
        printf("usage: DisplayImage.out <Image_Path>\n");
        return -1;
    }
    Mat image, imageGray;
    image = imread(argv[1], 1);
    if (!image.data)
    {
        printf("No image data \n");
        return -1;
    }

    cvtColor(image, imageGray, COLOR_BGR2GRAY);

    namedWindow("Display Image", WINDOW_AUTOSIZE);
    imshow("Display Image", image);
    imshow("Display Image Gray", imageGray);
    waitKey(0);
    return 0;
}