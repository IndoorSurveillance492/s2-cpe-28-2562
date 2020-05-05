import os

if os.path.exists('/Users/tryut/ISS Project/data/update/plot3.txt'):
    os.remove('/Users/tryut/ISS Project/data/update/plot3.txt')



with open('/Users/tryut/ISS Project/data/xy/3g.txt') as f:
    count = 0
    temp = ''
    for lines in f:
        if( temp == lines):
            # print('same')
            count = count + 2
            
        else:
            
            g = open('/Users/tryut/ISS Project/data/update/plot3.txt', "a")
            
            g.write(lines)
            g.close()
            count =  2
            
            temp = lines
            
        
           







            
 


