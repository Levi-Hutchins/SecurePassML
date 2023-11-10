import unittest
import sys
import os.path
sys.path.append(
    os.path.abspath(os.path.join(os.path.dirname(__file__), os.path.pardir)))
from ModelLoader import ModelLoader 

def createTokens(f):
    tokens = []
    for i in f:
        tokens.append(i)
    return tokens

class TestModel(unittest.TestCase):
    def setUp(self):
        self.model = ModelLoader()
    def test_low_passwords(self):
        self.assertEqual(self.model.classify_strength("password"), 0)
        self.assertEqual(self.model.classify_strength("olmaz"), 0)
        self.assertEqual(self.model.classify_strength("bgrvl80"), 0)

    def test_medium_passwords(self):
        self.assertEqual(self.model.classify_strength("password123"), 1)
        self.assertEqual(self.model.classify_strength("MyPassword"), 1)
        self.assertEqual(self.model.classify_strength("CoolDog101"), 1)

    def test_high_passwords(self):
        self.assertEqual(self.model.classify_strength("HArDP@ssw0rD!"), 2)
        self.assertEqual(self.model.classify_strength("CrypTic9iLeSanDs@1"), 2)
        self.assertEqual(self.model.classify_strength("RLPicv#EUB4_6K4zJ=$"), 2)
    
if __name__ == "__main__":
    unittest.main()


