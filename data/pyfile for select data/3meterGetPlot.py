import os

if os.path.exists('/Users/tryut/ISS Project/data/update/plot2-0.txt'):
    os.remove('/Users/tryut/ISS Project/data/update/plot2-0.txt')
# if os.path.exists('/Users/tryut/ISS Project/data/update/plot2-2.txt'):
#     os.remove('/Users/tryut/ISS Project/data/update/plot2-2.txt')


with open('/Users/tryut/ISS Project/data/xy/a.txt') as f:
    count = 0
    temp = ''
    for lines in f:
        if( temp == lines):
            # print('same')
            count = count + 2
            
        else:
            
            g = open('/Users/tryut/ISS Project/data/update/plot2-0.txt', "a")
            
            g.write(lines)
            g.close()
            count =  2
            
            temp = lines
            
        
           
# with open('/Users/tryut/ISS Project/data/xy/2-2.txt') as f:
#     count = 0
#     temp = ''
#     for lines in f:
#         if( temp == lines):
#             # print('same')
#             count = count + 2
            
#         else:
            
#             g = open('/Users/tryut/ISS Project/data/update/plot2-2.txt', "a")
            
#             g.write(lines)
#             g.close()
#             count =  2
            
#             temp = lines






            
 


