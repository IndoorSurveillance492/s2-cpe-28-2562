import os

if os.path.exists('/Users/tryut/ISS Project/data/mse/5_75max30.txt'):
  os.remove('/Users/tryut/ISS Project/data/mse/5_75max30.txt')
if os.path.exists('/Users/tryut/ISS Project/data/mse/5_75max45.txt'):
  os.remove('/Users/tryut/ISS Project/data/mse/5_75max45.txt')
if os.path.exists('/Users/tryut/ISS Project/data/mse/5_75max60.txt'):
  os.remove('/Users/tryut/ISS Project/data/mse/5_75max60.txt')


with open('/Users/tryut/ISS Project/data/5meter_valid30_notfound_median.txt') as f:
    for lines in f:
        if lines[15:30] == 'meterDistance: ':
            g = open('/Users/tryut/ISS Project/data/mse/5_75max30.txt', "a")
            g.write("1\n")
            g.close()
        if lines[15:17] == 'No':
            g = open('/Users/tryut/ISS Project/data/mse/5_75max30.txt', "a")
            g.write("0\n")
            g.close()

#  g.write(lines[30:])
with open('/Users/tryut/ISS Project/data/5meter_valid45_notfound_median.txt') as f:
    for lines in f:
        if lines[15:30] == 'meterDistance: ':
            g = open('/Users/tryut/ISS Project/data/mse/5_75max45.txt', "a")
            g.write("1\n")
            g.close()
        if lines[15:17] == 'No':
            g = open('/Users/tryut/ISS Project/data/mse/5_75max45.txt', "a")
            g.write("0\n")
            g.close()

with open('/Users/tryut/ISS Project/data/5meter_valid60_notfound_median.txt') as f:
    for lines in f:
        if lines[15:30] == 'meterDistance: ':
            g = open('/Users/tryut/ISS Project/data/mse/5_75max60.txt', "a")
            g.write("1\n")
            g.close()
        if lines[15:17] == 'No':
            g = open('/Users/tryut/ISS Project/data/mse/5_75max60.txt', "a")
            g.write("0\n")
            g.close()