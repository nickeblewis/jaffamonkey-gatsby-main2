---
title: An intro to the OS X command line
layout: post
date: "2015-07-14"
author: Eddy Hernandez
tags:
    - osx
    - command line
draft: false
foo:
    - "yes"
    - "2"
---

This post is inspired by the terrible experiences I had when I first started working in the command line and is hopefully a better introduction to working with it in OS X. Before we go any further, I highly suggest you download and install [iTerm2](http://www.iterm2.com/) because the default Terminal.app can be a bit little lacking. Once installed, keep it in your dock. __It's your new best friend.__

If you're not comfortable with that option, you can always use the default terminal found in OS X at: `Applications > Utilities > Terminal.app`

<p class="stretch">
  ![Terminal.app]({{baseUrl}}/images/posts/finder-terminal-app.png)
</p>

Throughout this post I'll have code examples to highlight commands and their output. The examples will use the following documentation style:

- the __commands__ you'll be typing in will be the first line of every example and any lines that are not grayed out
- be sure to __hit the enter key__ after you've confirmed the commands you've typed out, if not the terminal will not process the command
- __comments__ will start with a `#` and will be grayed out

Here's an example below that you can try out. The command is the first line and the expected result of the command is commented out in the second line.

```bash
echo "hello world"
# hello world
```

The command you just entered prints out or "echos" a message that you specify. That example isn't that useful but the next examples will guide you through the core concepts needed to make the most of the terminal. These concepts include:

- Navigating the File System
- Manipulating the File System
- Helpful Tips & Tricks
- Shells & Settings

## Navigating the File System

### Print Working Directory

First things first, when you run a command, it is always run from a folder on your system. This context or __working directory__ is important to know since some commands are run relative to this. To show or "print" your current working directory, run the following command.

```bash
pwd something
#  /Users/yourusername
```

Don't worry if your output doesn't look like `/Users/yourusername`, the next command, `cd`, will get you back on track.

### Change Directory - Part One

The change directory command helps you navigate through your file system. Run the following command to navigate to your home directory.

```bash
cd
```

There's no output for this command but if you run `pwd` again you should see your home directory.

### Open Current Directory

So now that we know where we are, the next command will open the Finder.app to help us relate what's "around" us.

<pre><code class="language-bash"><span class="token keyword">open </span>.
<span class="token comment"># A Finder window with your home directory should have opened up</span>
</code></pre>

### List Directory Contents

Run the following command to list the current directory contents, which in our case would be our users main folders.


<pre><code class="language-bash"><span class="token keyword">ls</span>
<span class="token comment"># Desktop Documents Downloads Library Movies Music Pictures Public Sites</span>
</code></pre>

### Command Arguments

Any characters that come after a command can be considered an argument. Arguments may also be referred to as flags, options or parameters. Arguments alter the default options for a command.

The output from the previous command was hard to read. To list directory contents in a proper list, add a `-l` argument to the previous `ls` command.

<pre><code class="language-bash"><span class="token keyword">ls </span>-l
<span class="token comment"># Desktop</span>
<span class="token comment"># Documents</span>
<span class="token comment"># Downloads</span>
<span class="token comment"># Library</span>
<span class="token comment"># etc.</span>
</code></pre>

To also include normally hidden files, like dotfiles -> `.example`, use the `-la` argument.

<pre><code class="language-bash"><span class="token keyword">ls </span>-la
<span class="token comment"># .bash_history (example of hidden file)</span>
<span class="token comment"># .DS_Store</span>
<span class="token comment"># Desktop</span>
<span class="token comment"># Documents</span>
<span class="token comment"># etc.</span>
</code></pre>

### Change Directory - Part Two

Now that we know arguments, let's use them to move around our file system. Run the change directory command with `~/Documents` as an argument to navigate to your Documents folder. Note, the `~/` is a shorthand notation for the path to your users home directory. `~/` is equal to `/Users/yourusername`.

```bash
cd ~/Documents
```

Next, lets print our new working directory

```bash
pwd
# /Users/yourusername/Documents
```

Next let's print out the same stuff you'd see in Finder.app for the Documents directory

<pre><code class="language-bash"><span class="token keyword">ls </span>-la
</code></pre>

Good stuff so far? Lets go a little bit further.

## Manipulating the File System

Next up, we'll be working from our Desktop directory to create a few child directories and files. Remember, you can use your Finder app to verify the commands you have run. Let's go ahead and change our working directory to the Desktop.

```bash
cd ~/Desktop
```

### Make Directory

To create a directory or folder, you'll use the `mkdir` command. Let's create a directory on the desktop called "tmp" by running the following command.

<pre><code class="language-bash"><span class="token keyword">mkdir </span>tmp
</code></pre>

### Create Files

Before we create files, navigate to the tmp directory we just created.

```bash
cd tmp
```

Now we can create a few files using the `touch` command.

<pre><code class="language-bash"><span class="token keyword">touch </span>foo.txt
<span class="token keyword">touch </span>bar.txt
</code></pre>

Next, let's create another directory and create a file inside it. We can create files that are not in our current working directory by specifying the path to the file we want to create, `test/sample.txt`.

<pre><code class="language-bash"><span class="token keyword">mkdir </span>test
<span class="token keyword">touch </span>test/sample.txt
</code></pre>

Use `ls -l` or open this up in finder (`open .`) to visualize what we've created.

### Copy

In order to copy files we'll use the `cp` command. Try copying `foo.txt`.

<pre><code class="language-bash"><span class="token keyword">cp </span>foo.txt foo_copy.txt
</code></pre>

Next let's copy the `test` directory we made earlier and name this new copy `exam`. We'll have to use the `-r` argument to ensure it recursively copies the directory and any files inside of it.

<pre><code class="language-bash"><span class="token keyword">cp </span>-r test exam
</code></pre>

In this last `cp` example we'll copy bar.txt into the exam directory.

<pre><code class="language-bash"><span class="token keyword">cp </span>bar.txt exam/bar.txt
</code></pre>

Here's a break down of the `cp` command

 - the first argument after `cp` is the file or directory location
 - the second argument is the destination of the file or directory
 - `cp filename.txt copyoffilename.txt` or `cp -r dir_path dir_path_copy`

### Move & Rename Files

The `mv` command allows you to move files or directories. Try it out by moving the file `foo.txt` inside of the `exam` directory.

<pre><code class="language-bash"><span class="token keyword">mv </span>foo.txt exam
</code></pre>

Next, let's move the `test` directory inside of the `exam` directory.

<pre><code class="language-bash"><span class="token keyword">mv </span>test exam
</code></pre>

It sounds weird but we can also rename files by using the same `mv` command. Let's practice renaming a file by changing `bar.txt` to `foobar.txt`.

<pre><code class="language-bash"><span class="token keyword">mv </span>bar.txt foobar.txt
</code></pre>

Next, we'll practice renaming a directory by changing exam to quiz.

<pre><code class="language-bash"><span class="token keyword">mv </span>exam quiz
</code></pre>

### Remove/Delete

The `rm` command is used to delete files and/or directories. Unlike deleting a file or folder form the Finder app, this command does not move things to the Trash bin. Let's try using the `rm` command to delete the file `foobar.txt`.

<pre><code class="language-bash"><span class="token keyword">rm </span>foobar.txt
</code></pre>

Next, let's delete the `test` directory within the `quiz` folder. We'll pass `-rf` as an argument to remove everything within `quiz/test`.

<pre><code class="language-bash"><span class="token keyword">rm </span>-rf quiz/test
</code></pre>

## Tips & Tricks

### History

Use the `up` and `down` arrow keys to go through your history of commands. To view your entire history of commands, use the `history` command.

```bash
history
```

To search your history of commands for something like "mkdir" (to see which directories you created), use `grep` in the following pattern.

```bash
# history | grep "text to search"
history | grep "mkdir"
```

In the previous command we used the `|` or pipe character. It's used to pass in the output from the command on the left, `history` and pipes it into the next command, `grep mkdir`. I can't stress how much this command combo has saved me.

### Fix permissions

Permission errors are the most common problems I see people run into using the command line. Usually this happens when installing a language or language dependency. To fix this, run the following command to set your current user as the owner of the `/usr/local` directory.

<pre><code class="language-bash"><span class="token keyword">sudo chown </span>-R `whoami` /usr/local
</code></pre>

### Add a shortcut to your editor

If you're using Sublime Text, it'll be very useful to have the `subl` command available to launch the app from the command line. With this you can pass in files or directories to open them directly in Sublime Text.

<pre><code class="language-bash"><span class="token keyword">ln</span> -s "/Applications/Sublime Text.app/Contents/SharedSupport/bin/subl" /usr/local/bin/subl
</code></pre>

Example usage:

<pre><code class="language-bash"><span class="token comment"># to edit a file foo.txt</span>
<span class="token keyword">subl</span> foo.txt

<span class="token comment"># to open the current directory</span>
<span class="token keyword">subl</span> .
</code></pre>

## Wrapping up

Alright! I think that covers the most important skills for working with the terminal, navigating and manipulating the file system. With this knowledge you'll have a better experience learning other [cool tips](https://computers.tutsplus.com/tutorials/40-terminal-tips-and-tricks-you-never-thought-you-needed--mac-51192) or advanced stuff, like [using git](https://try.github.io). In a future post I'll cover some other topics like shells, terminal settings, aliases and environment variables. As always, if you run into any issues with the commands above or if you have any feedback, feel free to leave a comment or [open](https://github.com/eddywashere/eddywashere.com/issues/new) up a github issue.
