+++
description = ""
title = "Behaviors and streams, why both?"
date = "2017-05-12T14:25:45+01:00"
categories = []
tags = ["typescript", "javascript", "functional reactive programming", "frp", "behavior"]
draft = false
+++

# Introduction

Functional reactive programming (FRP) has historically included two
different abstractions over time: behavior and stream. Today most FRP
and FRP-inspired libraries only have a single abstraction over time.
This one abstraction is typically called "stream" or "observable".

People used to these libraries may wonder: Why do I need both behavior
and stream? I'm doing fine with just streams/observables. Asking that
is natural. In fact, when I wrote my first FRP library
[Flyd](https://github.com/paldepind/flyd/) I only included a single
abstraction over time. I thought it was simpler than having two
concepts.

However, after digging deeper into FRP I came to see that one loses
something very crucial when not making a distinction between behaviors
and stream. What exactly that is is not obvious, however. In this blog
post, I will try to explain what it is.

# What is the difference anyway?

Both behaviors and streams represent things that happen or changes
over time. But still, they are very different. Visually this
difference looks like this.

![Diagram of behavior and stream](/behaviorstream.svg)

Intuitively, a behavior is a value that changes over time. And a
stream is something that has occurrences at specific moments in time.
A behavior can be seen as a function over time. A stream, on the other
hand, is a list of events associated with their time of occurrence.

To figure out whether something is conceptually a behavior or a stream
one can simply ask: Does this thing has a "current value" or does it
instead have a "last occurrence"? In the first case, it is a behavior
and in the later case a stream.

The classic example is the mouse. Its position is a behavior while the
clicks of its buttons are streams. Here are a few additional examples:

* Sunset is a stream. It doesn't have a current value but it does have
  a last occurrence.
* The position of the sun is a behavior since it always has a current
  value.
* The height of a tree is a behavior since it has a current value.
* Leaves falling off of a tree is a stream—we can tell when a
  leave last fell off the tree.

As you can see things in the real world are either a behavior or a
stream. So it seems natural that our programs should be able to
express the difference as well.

# How can one get away without both?

Most libraries that only have a single abstraction over time has one
that is much more like a stream than like a behavior. They pretty much
just lack behavior altogether. Whenever people say things such as "an
observable is like a list over time" they are talking about streams.
They can't be talking about a behavior because a behavior is a
function over time.

How do they compensate for the lack of behaviors? Well, essentially
one just "interprets" a stream as a behavior. The image below
illustrates this.

![Stream as behavior](/stream-as-behavior.svg)

On the left, we see an actual behavior and on the left we see a stream
interpreted as a behavior. We simply remember the last occurrence and
takes it to be the "current value" of the stream. Some libraries
remember event occurrences like this by default while other have a
variant of their stream/observable that does. So even though some
libraries doesn't recognize behaviors as a separate thing they still
need features to fill in the gap.

The crucial question now is: What are the downsides to only supporting
this "fake" behavior? What are the benefits of having an actual
behavior separate from streams? Hang tight, because that is what the
rest of this blog posts covers.

# It is precise and explicit

When programming it is generally good practice to use types that are
as precise as possible. For instance, even though we could, in theory,
represent all numbers as strings, we don't. Even when programming in a
dynamic language like JavaScript it is a good idea to have an idea
about which types of values your variables contain. For instance, you
may be thinking things like "this variable is a number" and "this
variable is a string".

Likewise, when programming with FRP it is beneficial to know which
things in a program are behaviors and which things in a program are
streams. Conceptually these are two different things! Asking yourself
whether a certain phenomenon is a behavior or a stream is highly
useful. It is a useful mental process that makes you more aware of
what exactly you are dealing with. Making a distinction between
behavior and streams gives us richer vocabulary. If your program also
makes the distinction this richness will translate into programs that
are more expressive and precise about they are talking about.

On the other hand, expressing both behaviors and streams with a single
abstraction makes it is impossible to make a clear distinction. That
can create confusion and inhibit features and performance because two
separate concerns are mixed into a single abstraction.

# It prevents mistakes

Libraries that makes a distinction between behaviors and streams can
prevent many errors from happening.

For instance, a behavior always has a current value. But, streams
doesn't. This means that when a stream is used as a behavior the user
will have to remember to supply some initial occurrence to the stream.
If the user forgets that, a bug has been introduced.

A library that recognizes behaviors can know exactly when it is
dealing with such. When a current value is expected the API will
require a behavior. And the API makes it impossible to create
behaviors that don't have an initial value. This completely
eliminates errors where initial values are missing.

Another thing we can prevent with explicit behaviors is meaningless
operations. There are a bunch of operations that we can apply to a
stream that does not make sense on a behavior. Likewise, there are
operations that make sense on a behavior but not on a stream.
Libraries that can't tell the difference between behaviors and streams
can't prevent people from carrying out operations that don't make
sense.

As an example, it makes sense to combine two streams by merging their
occurrences. Visually it looks like this

![Diagram of combining streams](/images/stream-combine.svg)

However, combining two behaviors in this manner doesn't make any
sense. But still, libraries that don't support behaviors can't prevent
it. We may end up merging the position of one object with the position
of another object. This will a result that no longer makes sense
understood as a behavior. This can lead to code that does "shady" or
confusing things by exploiting that behaviors are represented as
stream.

# It is a higher abstraction

Some behaviors have multiple representations as a streams. For
instance, these two streams represent the exact same behavior.

![Diagram of combining streams](/images/equivalent-streams.svg)

Clearly, these "extra" occurrences don't change the streams meaning as
a behavior. But a stream-only library doesn't know that. Since the
library doesn't have the behavior abstraction but uses streams instead
its API necessarily exposes how many occurrences a steam is made of.
Even when it's used as a behavior.

When implementing a behavior, the API can be designed such that
"peeking into" the internal representation of a behavior in this
manner is impossible. The library knows when the user actually wants
to use a behavior. This allows for more optimizations since no
implementation details are exposed.

For instance, when implementing behavior with a dependency graph only
actual changes in values have to be propagated. As an example of this,
let's say a user writes the following:

```js
const flooredNumberBehavior = numberBehavior.map(Math.floor);
```

Clearly some changes to `numberBehavior` won't lead to a change in
`flooredNumberBehavior`. Maybe an update flows down that changes
`numberBehavior` from `3.5` to `3.8`. In this case an implementation
of behavior can recognize that nothing changes in
`flooredNumberBehavior`. This allows it to simply stop propagating
changes down.

This can lead to substantial improvements to performance as it
prevents needles re-computation. To , such an optimization can
never be done. Because someone might call a method like `scan` later
that exposes the number of occurrences and not just changes in value.

# It allows for infinite resolution behaviors

While the stream interpreted as behavior, we saw above, can represent some
behaviors it can't represent all behaviors. Some behaviors it can only
crudely approximate. That is because a behavior can change "infinitely
often". I.e. be continuous. An example of such a behavior is seen below.

![Approximating behavior with stream](/images/stream-approximation.svg)

To the right, we have an attempt at approximating the behavior with a
stream. Clearly, such an approximation is lossy and imprecise.

Being able to represent these types of behaviors with infinite
resolution is extremely beneficial. In particular, it is helpful when
writing programs that deal with things such as time and motion. Like
when implementing animations for instance.

One may think that this problem can be avoided simply by using streams
with a resolution that is "good enough". But the problem is not only
related to resolution. It is also a problem about composition.

For instance, let's say you want to implement an animation with
streams. You may think, I'll just create a stream that has an
occurrence for each frame. Clearly, that resolution is good enough. But
consider what then happens if you combine two such streams. For
instance, you may have an `x`-coordinate that changes every frame and a
`y`-coordinate that does the same. If you combine those you get a
stream that changes twice every frame. That is pretty bad.

With an FRP library that support continuous behaviors that problem does
not exist. You'd simply have a behavior for the `x`-coordinate and one
for the `y`-coordinate. Internally those will be represented in a way
that supports infinite resolution. Thus, when you combine them you
simply get a third behavior, also of infinite resolution.

The above problem is similar to vector graphics vs. pixel graphics.
Vector graphics has infinite resolution. This means that we can, among
other things, zoom in and rotate without losing quality. Of course, at
some point, a vector image will have to be converted to pixels in
order to be displayed on the screen. But such a conversion only
happens at the very last step, after we have zoomed and rotated.
Similarly, when working with behaviors of infinite resolution all
operations on them happens to the internally infinite version. Only
for the purpose of showing them on the screen are they converted to a
format with the necessary resolution.

# Conclusion

We have seen some of the main benefits of recognizing that behaviors
and streams are two different things. It may up front seem like having
two abstractions is more complex that just one. But it turns out that
down the road it makes things much simpler and more powerful. In
general, programs that keep separate things separate are easier to
understand.