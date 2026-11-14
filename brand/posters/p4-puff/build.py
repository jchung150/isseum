import json
G=json.load(open('modak-glyphs.json'))
X0,W,GAP=90,1008,14
rows=[[('H',250),('E',196),('R',278),('E',242)],
      [('N',262),('O',392),('W',326)],
      [('T',214),('O',270),('G',300),('E',182)],
      [('T',282),('H',214),('E',196),('R',274)]]
tops0=[300,350,306,340]          # first-row tops, uneven like the reference
base=[640,940,1210,1478]; amp=[48,46,46,20]
sky=[0]*W; out=[]
for k,row in enumerate(rows):
    tot=sum(w for _,w in row)+GAP*(len(row)-1); x=(W-tot)//2
    for i,(L,w) in enumerate(row):
        top=tops0[i] if k==0 else max(sky[x:x+w])+GAP
        bot=base[k]+amp[k]*(1 if (i+k)%2==0 else -1)
        if k==3: bot=base[k]+amp[k]*(1 if i%2 else -1)
        h=bot-top
        gx,gy,gw,gh=G[L]; sx=w/gw; sy=h/gh
        out.append(f'<text transform="translate({X0+x-gx*sx:.1f} {top-gy*sy:.1f}) scale({sx:.3f} {sy:.3f})" font-size="300">{L}</text>')
        for j in range(x,x+w): sky[j]=bot
        print(k,L,round(h),file=__import__('sys').stderr)
        x+=w+GAP
print(json.dumps({'svg':''.join(out),'bottom':base[3]+amp[3]}))
