import string
import random
import os
from io import BytesIO
from PIL import (
    Image,
    ImageDraw,
    ImageFont,
    ImageFilter
)

from django_vue import settings

class CaptchaUtil:

    def __init__(self):
        self.code = string.ascii_lowercase.replace("l", "").replace("i", "").replace("o", "").replace("z", "")
        self.random_codes = ""
        self.bits = 4
        self.width = 100
        self.height = 40
        self.line_num = 5
        self.bgcolor = (random.randint(0, 255), random.randint(0, 255), random.randint(0, 255))
        self.frontcolor = (random.randint(0, 255), random.randint(0, 255), random.randint(0, 255))
        self.font = os.path.join(settings.BASE_DIR, "static/fonts/OPTIHandelGothic-Light.otf")

    def generate_image(self):
        image = Image.new("RGB", size=(self.width, self.height), color=self.bgcolor)
        font = ImageFont.truetype(self.font, 25)
        draw = ImageDraw.Draw(image)
        code_list = list(self.code)
        random.shuffle(code_list)
        random_codes = "".join(code_list[0: self.bits])
        self.random_codes = random_codes

        # draw captcha
        draw.text(xy=(5, 2), text=random_codes[0], font=font, fill=self.frontcolor)
        draw.text(xy=(25, 2), text=random_codes[1], font=font, fill=self.frontcolor)
        draw.text(xy=(50, 2), text=random_codes[2], font=font, fill=self.frontcolor)
        draw.text(xy=(75, 2), text=random_codes[3], font=font, fill=self.frontcolor)

        # draw line
        for _ in range(self.line_num):
            start = (random.randint(0, self.width), random.randint(0, self.height))
            end = (random.randint(0, self.width), random.randint(0, self.height))
            draw.line([start, end], fill=self.frontcolor)

        # draw point
        for _ in range(100):
            point = (random.randint(0, self.width), random.randint(0, self.height))
            draw.point(point)

        # transform captcha
        image.transform((self.width, self.height),
                        Image.AFFINE,
                        (1, 0, 0, 0, 1, 0),
                        Image.BILINEAR)
        image = image.filter(ImageFilter.EDGE_ENHANCE_MORE)
        return image

    def get_captcha_image_buffer(self):
        buffer = BytesIO()
        image = self.generate_image()
        image.save(buffer, "png")
        image.close()
        buffer.seek(0)
        return buffer, self.random_codes


if __name__ == "__main__":
    captcha = CaptchaUtil()
    print(captcha.code)