#!/usr/bin/python3

import json
import os
from typing import Generator, List
from generalfunctions import NotFoundException


class FileReader:
    file = ""

    def __init__(self, file: str):
        if os.path.isfile(file):
            self.file = file
        else:
            raise NotFoundException("file was not found")

    def read_lines(self) -> Generator[str, None, None]:
        f = open(self.file, 'r')
        for line in f:
            if line[0] != '#':
                yield line

    def read_words_by_line(self, sep=" ") -> Generator[List[str], None, None]:
        f = open(self.file, 'r')
        for line in f:
            if line[0] != '#':
                yield line.split(sep=sep)

    def get_json(self):
        f = open(self.file, 'r')
        for line in f:
            if line[0] != '#':
                yield json.loads(line)


class FileWriter:
    file = ""

    def __init__(self, file):
        if os.path.isfile(file):
            self.file = file
        else:
            raise NotFoundException("file was not found")

    def write_lines(self, lines: []):
        f = open(self.file, 'a+')
        f.write("\n")
        f.writelines(lines)

    def write_words(self, words: [], sep=' '):
        f = open(self.file, 'a+')
        word_index = 0
        for word in f:
            if word_index >= 0:
                f.write(sep + word)
            else:
                f.write(word)

    def write_line(self, line: str):
        f = open(self.file, "a+")
        f.write(line + "\n")
