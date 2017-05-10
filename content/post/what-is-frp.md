+++
description = ""
title = "Let's reinvent FRP"
date = "2017-02-18T14:25:45+01:00"
categories = []
tags = ["typescript", "javascript", "functional reactive programming", "frp"]
draft = true
+++

<!--
 
# Outline

* Introduction
  Why is FRP interesting
* Our goal
  What do we want from FRP?
* Thinking like Conal
  Explain denotational design.
* Time changing values
  Introduce behavior
* Implementing behavior
  Implement behavior and lift
* Bending time
  Showcase delay and slower
* Reactivity
  Explain why stream is needed and define it.
* Combining behaviors and streams
  Explain stepper and switcher
* Stateful behaviors
  Explain stateful behaviors and introduce `scan`
* Conclusion
  Recap of what was learned and about how awesome FRP is.

What is functional reactive programming

# Outline

* The mission
  Many modern takes on FRP has been said to miss the point.
* The goal
  Describe what problem we wish to solve with FRP.
* Thinking like Conal

Old outline.

* Introduction
  * Sell FRP and describe what problem it solves.
  * Describe what this blog post will explain and why it is needed.
  * Why FRP matters
  * FRP is misunderstood
  * It's elegant and powerful
  * It changed my perspective on simplicity
* Behavior and event
  * Explain with implementation
  * Why both are necessary
  * Mouse movement is not events
* A few combinators
  * What can be do with FRP
  * Implementations
* Semantic design
  * Simplicity
* Continuous times
  * Example of some sort
  * Gives us nice properties
* Further reading
  * Conal Elliot papers
-->

## Introduction

In this blog post we will set out on a journey to reinvent _functional
reactive programming_. FRP is an elegant and powerful way to express
interactive programs in a purely functional way. More than that, it
embodies an approach to library design called _denotational design_
that has utility way beyond FRP. The technique is both brilliant and
very different from how most developers think about library design.

Many modern libraries aim to solve the same problem that FRP did. But
most of them don't do it as elegantly as FRP, missing the insights
present in FRP. I think part of the reason is that most information
about FRP is only to be found in academic papers. To remedy the
situation I will, in this blog post, do my best to explain the
fundamentals of FRP in an approachable fashion.

We will go back to the roots of FRP to figure out what it is really
about. We will see what problem FRP was made to solve and how it
solves it. To do so we will consider the underlying principles behind
its design. Along the way we will also implement a very simple FRP
library in TypeScript.

## Our goal

The "functional" in FRP means _purely_ functional declarative
programming. The "reactive" means that we want to write programs that
react to user input—like mouse movement and keyboard presses. What the
name FRP does not capture, however, is that FRP is also inherently
about _time_.

When writing interactive programs we have to deal with a lot of
quantities that change while the program is running. For instance, if
we want to display an animation, the position of the shapes in the
animation will have to change. With imperative programming this is
most often achieved by directly changing variables as in this example.

```js
let x = 0;
function mainLoop() {
  x += 1; // move one pixel to the right
  render(); // render a new frame
  window.requestAnimationFrame(mainLoop);
}
```

Here `x` changes as time progresses. This technique is inherently
imperative. The program above is a sequence of steps that _does_
things in order to achieve the animation. Functional programming, on
the other hand, is about _being_ and not about doing. We want a pure
way to declare what `x` actually is—a value that changes over time.
The above code only captures this indirectly through the imperative
steps that are carried out.

We want a purely functional way of expressing programs like the one
above. Programs with values that change over time and that react to
input from the user. That is what FRP gives us.

## Thinking like Conal

FRP was invented by Conal Elliott. So to reinvent it properly we
should understand how Conal thinks when he designs libraries.
Fortunately, he has been kind enough to describe this on several
occasions.

Conal uses a process that he calls _denotational design_. The
technique is radically different from the way most programmers
approach software design. That may sound slightly frightening.
Fortunately, it's actually a quite simple and a very clever idea.

First, we must understand the following.

{{% info %}}

Any library is essentially about _things_ and _operations_ on these
things.

{{% /info %}}

In object-oriented programming things are represented as objects. They
can be created with constructors. The operations we can manipulate
them with are methods. In functional programming things are typically
expressed as data types and the operations on them as pure functions.

For instance the things a 3D library deals with might be three
dimensional shapes. As operations it may provide ways to translate or
rotate shapes. As another example, a database library handles things
such as relations, queries and constraints. It provides operations
construct queries and operations to carry them out on relations.

Denotational design tells us that we should be precise about what the
things our library talks about are. We do that by giving them a
_meaning_ (or semantic) in the form of a precise specification. The
specification should satisfy three criteria

* _Precision_. A vague specification is no good. Precision is achieved
  by associating the things in our code to mathematical objects.
* _Simplicity_. The simpler the better. A simple specification ensures
  that the library is easy to understand and use. Implementation
  details should be kept out of the specification.
* _Sufficiency_. All the operations that we'd like our library to
  offer should be explainable based on the specification.

We can break down the process of denotational design into three steps.

1. Think about the things your library will work with and the
   operations it must support. Preferable this thinking should be on
   an intuitive level.
2. Assign a meaning to the things the library will deal with. This
   specification should satisfy the criteria above to the extend
   possible.
3. Implement the specification. Details of the implementation should
   be guided by the semantics. If you run into trouble you may have to
   revise them.

Let's see this process in action applied to the problem of designing
functional interactive programs.

## Time changing values

Remember that we wanted a purely functional way of expressing things
that change and reacts to input from the user.

On an intuitive level we need a representation for values that can
change as time passes. For instance we want to represent the position
of a moving object as it changes over time. Let's call such a changing
value a _behavior_.

We have identified a _thing_ which is step 1 in the process above.
Step 2 is now to assign a meaning to the thing by associating it with
a mathematical object. A behavior represents values that _depends_ on
time. The standard mathematical way of representing a value that
depends on another value is as a _function_. And since behaviors
represents values that change over time they should be a function from
time.

{{% info %}}
A behavior is a function from time to a value.
{{% /info %}}

We now have a new question. What is time? Time is another _thing_. So
we need to apply step 1 and 2 to time as well. What is time at an
intuitive level? There is past, present and the future. So time is
one-dimensional. Also, time is a steady flow. It changes _all the
time_. It is _continuous_. If we look for a mathematical object that
satisfies this intuition we find the real numbers. So a point in time
is a real number.

## Implementing behavior

Let's make an attempt at step 3—implementation. When using
denonational design the semantics suggests a very simple
implementation. We can simply implement the semantics directly as
code. That is often the quickest way to get started. It is, however,
important to understand that we don't have to do that. The
specification exists at a conceptual level. We can implement things
any way we want as long as the implementation behaves as the semantics
suggests.

That is one of the benefits of denotational design. The specification
offers a precise description of how the library should behave. It is
high-level and free from technical details. These qualities gives a
large amount of freedom to implementations while still serving as a
measure of correctness.

Let's first implement time. We don't have real numbers in
TypeScript—only doubles. They're a pretty decent approximation though,
so let's use them.

```ts
type Time = number;
```

Next, define behavior to be a function from time.

```ts
type Behavior<A> = (t: Time) => A;
```

We have now established the types. What concrete behaviors can we
think of? The simplest function I can think of is the identity
function. The function that just returns its argument. The identity
function is a behavior that always contains the current time.

```ts
type timeB: Behavior<Time> = (t) => t;
```

Another very simple group of functions are constant functions.
Functions that don't look at their argument, but instead always
returns the same value. Such functions are also behaviors.

```ts
function constB<A>(a: A): Behavior<A> {
  return (t: Time) => a;
}
```

`constB` takes a value and returns a behavior that has that value at
any point in time. In a sense it is a behavior that doesn't use it's
"behavior-powers" in any way.

We now have a behavior of the current time and a way to create
constant behaviors. The next thing to do is to define some operations
on behaviors. That is, ways to combine existing behaviors into new
behaviors.

If one has a function from values of type `A` and a behavior of `A` it
seems that it should possible to apply the function to the values
inside the behavior. I.e., create a new behavior that for any point
in time asks the original behavior for it value at that time, applies
the function to the value, and returns the result. This can be
implemented simply as function composition.

```ts
function lift1<A, B>(f: (a: A) => B, a: Behavior<A>): Behavior<B> {
  return (t) => f(a(t));
}
```

It gets a bit tedious, but we can do the same thing with functions
taking more than one argument.

```ts
function lift2<A, B, C>(f: (a: A, b: B) => C, a: Behavior<A>, b: Behavior<B>) {
  return (t) => f(a(t), b(t));
}
function lift3<A, B, C, D>(f: (a: A, b: B, c: C) => D, a: Behavior<A>, b: Behavior<B>, c: Behavior<C>) {
  return (t) => f(a(t), b(t), c(t));
}
```

This is TypeScript, and not Haskell. So, let's do the above with a
more convenient variadic function instead.

```ts
export function lift<A, B>(f: (a: A) => B, a: Behavior<A>): Behavior<B>;
export function lift<A, B, C>(f: (a: A, b: B) => C, a: Behavior<A>, b: Behavior<B>): Behavior<C>;
export function lift<A, B, C, D>(f: (a: A, b: B, c: C) => D, a: Behavior<A>, b: Behavior<B>, c: Behavior<C>): Behavior<D>;
export function lift<A>(f: (...args: any[]) => A, ...behaviors: Behavior<any>[]): Behavior<A> {
  return (t) => f(...behaviors.map((b) => b(t)));
}
```

Here I use TypeScript overloads to make the variadic function typesafe
for up to three arguments.

What we have so far is very simple. Still our behavior implementation
is already powerful enough to express a simple animation.

```ts
lift((t) => circle(20, t * 100, 0), timeB);
```

Here `circle` is a function that takes a radius, an x-coordinate, a
y-coordinate, and returns an image. We lift the function over `timeB`
so the result is a behavior of a circle where the x-coordinate
increases over time. When animated the above code looks like this.

<div id="animation0"></div>

Here is another little animation where I apply `sin` to the value from `timeB`.

```ts
lift((t) => circle(20, t * 100 - 260, 50 * Math.sin(3 * t)), timeB);
```

<div id="animation1"></div>

In these examples, animations that depends on input from the outside
world will be represented as functions from a world object to a
behavior. The world object contains a special behavior called `mouse`.
`mouse` is a behavior of the current position of the mouse. Below is a
demonstration of this with a circle that follows the mouse.

```ts
function animation2(world: World): Behavior<Image> {
  return lift(({x, y}) => circle(20, x, y), world.mouse);
}
```

<div id="animation2"></div>

## Bending time

Our behaviors now has one of the core features that we desired. They
can represent changing values in a purely functional way. It would be
interesting to explore what else we can do with them. To this end the
semantics can serve as a guide.

A behavior is a function from time. Thus, if we have a behavior we
could transform it by wrapping it inside a new function from time.
This wrapping function could transform the time parameter before
passing it on to the wrapped behavior. By following that thought we
can implement the following combinators.

```ts
function delay<A>(delta: Time, b: Behavior<A>): Behavior<A> {
  return (t) => b(t - delta);
}

function slower<V>(n: number, b: Behavior<V>): Behavior<V> {
  return (t) => b(t / n);
}
```

`delay` takes a amount of time and a behavior. It then returns a new
behavior that is identical to the original behavior except being
delayed in time. `slower` slows down a behavior by a given factor.

Here is an animation that shows what these look like in practice. We
create a behavior called `movingCircle`. This behavior describes a
circle that moves along a sine curve. We then create new behaviors by
delaying and slowing down the moving circle. This gives us several
behaviors of circles that we combine with the `stack` function.
`stack` takes a variable amount of circles as argument and combines
them into one image of all the circles.

```ts
function animation3(w: World): Behavior<Image> {
  const movingCircle =
    lift((t) => circle(20, t * 100 - 260, 50 * Math.sin(3 * t)), timeB);
  return lift(stack,
    movingCircle,
    delay(1, movingCircle),
    slower(2, movingCircle),
    slower(4, movingCircle)
  );
}
```

<div id="animation3"></div>

## Streams

We can now express values that change over time. But, something is
still missing. For instance, let's say we wanted the above animation
to react when a user clicked with his mouse. We'd need a way to
express the clicks, and we can't do it with a behavior. Because, a
behavior is a thing that has a value at all moments in time and mouse
clicks aren't like that. They are events that occurs at specific
moments in time.

The above observation leads to the conclusion that our semantic model
is not yet as powerful as we'd want. Behavior needs a companion. A new
thing that can represent phenomenon like mouse clicks. By thinking
about the specifics of mouse clicks we can figure out what
requirements we have for this thing. This is step 1 in semantic design
process.

* There can be zero, one or many mouse clicks.
* Each mouse click happens at an exact discrete moment in time.
* Each mouse click has some associated data. Like where the mouse was
  pressed, etc.

Step 2 is to find a semantic model that would satisfy the above. The
first requirement indicates that we need some sort of collection. And
since mouse clicks are ordered we could use a list. The second point
hints that we should store the time of each click and to satisfy the
third demand we should also store data along with each time point.

This leads to the following semantic model.

{{% info %}}

A _stream_ is a list of records where each record contains a time
value and a data value. The records should be ordered increasingly by
their time.

{{% /info %}}

Since we are trying to keep things as simple as possible that will
also be the way we implement streams. We can express the above with a
type like this

```typescript
type Occurrence<A> = {time: Time, value: A};
type Stream<A> = Occurrence<A>[];
```

Let's see what we can do with streams. We can map a function over a
stream. That is, apply a function to the value in each occurrence.

```typescript
function map<A, B>(f: (a: A) => B, stream: Stream<A>): Stream<B> {
  return stream.map(({time, value}) => ({time, value: f(value)}));
}
```

We can also filter occurrences.

```typescript
function filter<A>(predicate: (a: A) => boolean, stream: Stream<A>): Stream<A> {
  return stream.filter(({value}) => predicate(value));
}
```

Notice that while `map` on streams is similar to `lift1` on behavior.
`filter`, on the other hand, only makes sense on streams.

## Combining behaviors and streams

Armed with behavior and stream we can represent both things that are
continuous and things that are discrete.

However, what if we wanted to implement an animation with a circle
that always moves to the last position where the user clicked? Like
this:

<div id="animation4"></div>

The position of the circle would be a behavior and the clicks a
stream. To create the moving circle we'd have to create a behavior
based on the occurrences in the click stream.

Looking at the example above we can see that the position has an
initial value at the center of the image. It then switches every time
a mouse click event occurs.

We could turn the click stream into a behavior that "steps" from each
event value to the next. At any point in time the behaviors value will
be the value of the last event before that point in time. Below is an
implementation of this function.

```ts
function findOccurence<V>(t: Time, stream: Stream<V>): Occurrence<V> | undefined {
  return stream.reduce((prev, occ) => occ.time < t ? occ : prev, undefined);
}

function stepper<V>(initialValue: V, stream: Stream<V>): Behavior<V> {
  return (t) => {
    const occ = findOccurence(t, stream);
    return occ !== undefined ? occ.value : initialValue;
  };
}
```

The function `stepper` takes an initial value, a stream, and returns a
behavior. The returned behavior starts out with the initial value and
steps through each occurrence value.

With the help of the `stepper` function we can implement the above
program like this

```ts
function animation4(world: World): Behavior<Image> {
  return stepper(
    circle(10, 0, 0),
    map(({ x, y }) => circle(10, x, y), world.clicks)
  );
}
```

Here I use the `clicks` stream that exists on the `world` object.

Consider the signature of `stepper`.

```ts
<V>(initialValue: V, stream: Stream<V>): Behavior<V>;
```

What if we replaced the occurrences of `V` in the arguments with with
`Behavior<V>`. Then we'd get the following function signature

```ts
<V>(initialValue: Behavior<V>, stream: Stream<Behavior<V>>): Behavior<V>;
```

That is more powerful than `stepper` because a value of type
`Behavior<V>` is more powerful than just `V`. Implementing this
function is very similar to the implementation of `stepper`.

```ts
export function switcher<V>(b: Behavior<V>, e: Stream<Behavior<V>>): Behavior<V> {
  return (t) => {
    const  occ = findOccurrence(t, e);
    return occ !== undefined ? occ.value(t) : b(t);
  };
}
```

We can confirm that `switcher` is more powerful than `stepper` by
observing that `stepper` can be implemented in terms of `switcher`.

```ts
function stepper<V>(initialValue: V, stream: Stream<V>): Behavior<V> {
  return switcher(constB(initialValue), map(constB, stream));
}
```

This implies that `switcher` is more _essential_ than `stepper`. If an
FRP library only provided `switcher` we could easily derive `stepper`
from it. But we cannot implement `switcher` from `stepper`.

## Stateful behaviors

Our FRP library now supports both stream, behaviors, and higher-order
combinations of these. But, if we try to create anything beyond the
simple animations that we've seen so far we will eventually stumble
into a problem where we will be stuck.

Here is an example of one such problem: Define behavior of a circle
where each time the user clicks with his mouse the size of the circle
increases by a small amount.

It sounds pretty simple. But we can't do it. The reason is that the
described behavior is a _stateful behavior_.

{{% info %}}

A _stateful behavior_ is behavior whose _current_ value depends on the
_past_.

{{% /info %}}

The above behavior is stateful because the current size of the circle
depends on how many times the mouse has been clicked _in the past_.

To support that we need a combinator that makes it possible to
remember the past. One such combinator is `scan`. `scan` works a bit
like `reduce` on arrays. It takes a function of type `(a: A, b: b) =>
B`, an initial value of type `B` and a stream of type `Stream<A>`. It
then returns a behavior that at any moment contains the result of
folding the function over all the occurrences in the stream before
that moment.

We can implement `scan` like this

```ts
function scan<A, B>(
  f: (a: A, b: B) => B, init: B, source: Stream<A>
): Behavior<B> {
  return (t: Time) => {
    const occurrencesBeforeT = source.filter(({time}) => time < t);
    const values = occurrencesBeforeT.map(({value}) => value);
    return values.reduce((b, a) => f(a, b), init);
  };
}
```

The implementation also shows the similarity with `reduce`. First we
discard all occurrences from the stream that happens after `t`, then
we extract the value from all the occurrences and finally we call
`reduce` on the resulting array.

With `scan` the behavior I described above can be implemented like
this:

```ts
function animation5(w: World): Behavior<Image> {
  const size = scan((_, s) => s + 3, 110, w.clicks);
  return lift((s) => circle(s, 0, 0), size);
}
```

And the result looks like this:

<div id="animation6"></div>

## Conclusion

We have now implemented what is a fully featured FRP library with very
little code.

We have seen how we can achieve some very powerful constructs using
simple semantics. Both behavior and stream are very simple compared to
most implementations of streams and observables that you will find.

This blog post has covered the fundamentals of FRP and the underlying
goals and ideas. There is, however, a lot of things that didn't fit
into this blog post.

* A deeper explanation about why it is beneficial to keep behavior and
  stream as two separate things.
* Why continuous time is beneficial. The semantics and implementation
  I introduced supports continuous time. But much more could be said
  about the importance of it.
* How to implement FRP in a practical way. The implementation in this
  blog post is in no way practical. It suffers from FRPs notorious
  problem with memory-leaks. Making higher-order FRP practical is
  possible but it adds a bit of complexity to the API and
  implementation.

I may or may not cover these topics in further blog-posts.

Finally, if this blog post has made you interested in FRP you may want
to take a look at the following FRP implementations or check out the
further reading below.

* [Hareactive](https://github.com/funkia/hareactive). An FRP library
  written in TypeScript.
* [Reactive
  Banana](https://github.com/HeinrichApfelmus/reactive-banana/). A FRP
  library written in Haskell that focuses on having simple semantics
  and an efficient implementation.
* [Reflex](https://github.com/reflex-frp/reflex). A FRP library
  written in Haskell that aims to be as practical as possible. It also
  comes with a framework
  [Reflex-DOM](https://github.com/reflex-frp/reflex-dom) that supports
  building web-apps with Reflex and GHCJS.

## Further reading

Below is are a few selected references that you may read if you desire more
information about the topics covered in this blog post.

* FIXME
* TODO
* Links to papers

<script src="/bundle.js"></script>
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">