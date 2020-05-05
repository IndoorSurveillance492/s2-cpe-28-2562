import os

if os.path.exists('/Users/tryut/ISS Project/data/xy/2-1.txt'):
    os.remove('/Users/tryut/ISS Project/data/xy/2-1.txt')
if os.path.exists('/Users/tryut/ISS Project/data/xy/2-2.txt'):
    os.remove('/Users/tryut/ISS Project/data/xy/2-2.txt')



with open('/Users/tryut/ISS Project/data/2meter-add.txt') as f:
    for lines in f:
        if lines[15:19] == 'plot':
            g = open('/Users/tryut/ISS Project/data/xy/2-1.txt', "a")
            g.write(lines[22:])
            g.close()

with open('/Users/tryut/ISS Project/data/2meter-addd.txt') as f:
    for lines in f:
        if lines[15:19] == 'plot':
            g = open('/Users/tryut/ISS Project/data/xy/2-2.txt', "a")
            g.write(lines[22:])
            g.close()








            


