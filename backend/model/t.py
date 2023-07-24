import sys
import passwordClassifer
def main():
    # Check if there is at least one command-line argument
    if len(sys.argv) < 2:
        print("Usage: python script.py <argument>")
    else:
        # Get the argument from the command-line (sys.argv[0] is the script name)
        argument = sys.argv[1]
        print("Argument provided:", argument)

def test():
    print(passwordClassifer.classifyPassword("Thispassword1"))

test()