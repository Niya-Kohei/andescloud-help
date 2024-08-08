

f = open('../index.html', encoding="UTF-8")
for l in f:
  if "html/" in l:
    start = l.find("html/")
    end = l.find(".html")
    print(l[start:end])
    

f.close()
