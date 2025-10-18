```mysql
SELECT sno, sname, sage FROM student
WHERE sdept IN ('CS', 'MA');
```

这里的IN相当于两个东西or