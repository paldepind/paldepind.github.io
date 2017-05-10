+++
description = ""
title = "Behavior and events, why both?"
date = "2017-05-07T14:25:45+01:00"
categories = []
tags = ["typescript", "javascript", "functional reactive programming", "frp"]
draft = false
+++

# Introduction

Functional reactive programming (FRP) has historically included two
different abstractions over time: behavior and stream. Today most FRP
and FRP-inspired libraries only have a single abstraction over time.
This one abstraction is typically called "stream" or "observable".

People used to these libraries may naturally ask: Why do I need both
behavior and stream? I'm doing fine with just streams/observables. In
fact, when I wrote my first FRP library
[Flyd](https://github.com/paldepind/flyd/) I only included a single
time abstraction because I though it was simpler than having two
concepts. However, after digging deeper into FRP I came to see that
one looses something very crucial when only having stream/observable.
In this blog post I will try to explain how.

# What is the difference anyway?

Both behaviors and streams represents things that happen or changes
over time. But still, they are very different. Visually this
difference looks like this.

![Diagram of behavior and stream](/behaviorstream.svg)

Intuitively, a behavior is something that has a value that may change
over time. And a stream is something that has occurrences at specific
moments in time. A behavior is a function over time. A stream is a
list of events associated with their time of occurrence.

To figure out wether something is a behavior or a stream one can
simply ask: Does this thing has a "current value" or does it instead
have a "last occurrence"? In the first case it is a behavior and in
the other case a stream. The classic example is the mouse. Its
position is a behavior while the clicks of its buttons are streams.
Here are a few additional examples:

* Sunset is an event. It doesn't have a current value but it does have
  a last occurrence.
* The position of the sun is a behavior since it always has a current
  value.
* The height of a tree is a behavior since it has a current value.
* Leaves falling off of a tree is a stream since we can tell when a
  leave last fell of the tree.

As you can see things in the real world are either behavior or stream.
So it seams natural that our programs should be able to express the
difference as well.

# How can one get away without both?

Most libraries that only have a single abstraction over time has one
that is much more like a stream than like a behavior. They pretty much
just lack behavior altogether. Whenever people say something like "an
observable is like a list over time" they can't talking about a
behavior because a behavior is a function over time.

So, how do they compensate for the lack of behaviors? Well,
essentially one just "interprets" a stream as a behavior. The image
below illustrates this.

![Stream as behavior](/stream-as-behavior.svg)

On the left we see a an actual behavior and on the left we see a
stream interpreted as a behavior. We simply remember the last
occurrence and takes it to be the "current value" of the stream. Some
libraries remember event occurrences like this by default while other
have a variant of their stream/observable that does.

What are the downsides to this "fake" behavior? Hang tight, because
that is what the following sections will cover.

# It's imprecise

When programming it is generally good practice to types that are as
precise as possible. Even though we could represent all numbers as
strings we don't.

# It's too permissive

There are a bunch of operations that we can apply to a stream that
does not make sense on a behavior.

# It doesn't match the real world

# Continuous stuff

# Exit

That was all for now!