# Help

## HTML/CSS

## 添加颜色

```html
<span style="color:red"> SomeText </span>
```

效果:

<span style="color:red"> SomeText </span>

---


## 如何进入 Terminal

### 方法一

打开 Mac 的 `Terminal` App ，应该会看到这个

```
~
λ
```
就说明说明你在根目录（“我的电脑”）。


在 `λ` 后面输入 `cd` （change directory，更改目录）和路径吧（然后回车）就可以进来啦（可以用 Tab 键来更快的输入）

```
λ cd PortfolioWebsite/xuechundesign.github.io
```

看到下面这个就对了：

```
xuechundesign.github.io git/master
λ 
```

### 方法二

在·`Visual Studio Code` 里打开网站之后用 `ctrl+\`` 打开编辑器的 terminal，如果看到下面这个就对了：

```
xuechundesign.github.io git/master
λ 
```

## Preview 预览

输入 `preview` 会自动在浏览器里打开 [localhost:4000](http://localhost:4000)，刷新一下应该就可以看到网站啦

```
xuechundesign.github.io git/master
λ preview
```

## Publish 发布

输入`publish` 则会真正发布到[xuechundesign.github.io](http://xuechundesign.github.io) 上

```
xuechundesign.github.io git/master
λ publish
```

## Terminal 命令

* `cd` change directory 去哪个目录，找不到的时候按 tab 就可以在里面选
* `ls` list files 看我在的目录里有哪些文件
* `open <filename>` 打开这个文件
* `open .` 在 Finder 里打开这个目录
 