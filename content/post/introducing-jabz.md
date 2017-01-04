+++
description = ""
title = "Introducing Jabz"
date = "2017-01-04T14:25:45+01:00"
categories = []
tags = ["javascript"]
+++

## Introduction

Jabz is a new library aimed at implementing powerful abstractions in
JavaScript while being as practical as possible. It is hugely inspired
by Fantasy Land but is an attempt at achieving something more
convenient and with better performance.

Jabz specifies the same abstractions as Fantasy Land. Functor, monad,
traversable, etc. Besides specifying these things it is also a library
that includes a common set of functions for working with the
abstractions, as well as often used implementations.

I initially created Jabz to be a TypeScript implementation of common
structures satisfying the Fantasy Land specification, but along the
way I had some ideas that warranted a new specification. In
this blog post I will explain how Jabz's specification of these
abstractions differ from Fantasy Land's. I will assume that the reader
is familiar with Fantasy Land and the related abstractions.

Jabz can [be found on GitHub](https://github.com/Funkia/jabz).

## Goals

My overlaying goal was to create a specification and a library that
achieved the following properties:

* **Convenience**. Using the abstractions should be as convenient as
  possible from an end users perspective. Developer ergonomics should
  be highly valued.
* **Performance**. Inefficient abstractions are useless abstractions.
  The specification should give implementations the necessary room for
  creating performant implementation.
* **Power**. The abstractions should be as powerful as can be.
  That is, they should have as many features and support as many use
  cases as possible.

To achieve the above, the one thing I traded away was simplicity of
specification. Fantasy Land is a simple and elegant specification that
only concerns itself with what is strictly essential. Jabz, in
comparison, is more voluminous. I do, however, believe the trade-off is
worth it.

Below I will describe the major general differences between Jabz
and Fantasy Land. After that I will cover some of the specific
abstractions and how they are different in Jabz.

## Non-prefixed method names

Jabz uses non-prefixed method names. To be a functor an object must
have a `map` method. This is in contrast to Fantasy Land, where a
Functor must have a method named `fantasy-land/map`. Jabz uses
non-prefixed method names primarily since they're more convenient and
convenience is one of the primary goals.

One argument for prefixed method names in Fantasy Land is that then
libraries can implement the specification even if they currently have
methods with the same name that don't behave according to the
specification. In my opinion, disallowing that is a _good thing_.
Having a `map` method that does one thing and a `fantasy-land/map`
method that does another thing is a source of confusion. It creates
situations where `map(f,foo)` might do something different than
`foo.map(f)`.

Requiring non-prefixed methods ensures that if a structure supports
Jabz it is not allowed to have, for instance, an improper `map`
method. Jabz demands more from implementations. But it also means that
users can rely on implementations having easily accessible methods
that behave as expected.

## Beyond minimal complete definitions

Each abstraction specified by Fantasy Land is defined as a set of
methods. For instance, foldable is defined by a `reduce` method (I
prefer the name `foldr` so I'll use that going forward).

Part of the reason why the foldable abstraction is useful is that,
building on top of this single method, we can create many more. For
instance, we can derive a function for getting the number of elements in
any foldable.

```javascript
function size(foldable) {
  return foldable.foldr((n, m) => n + m, 0);
}
```

This is an example of a derived method.

{{% info %}}
A _derived method_ is one that can be defined in terms of other, often
more fundamental, methods.
{{% /info %}}

In all cases the number of methods that Fantasy Land requires by its
implementations are as few as possible. What it defines constitutes a
minimal complete definition of the given abstraction.

{{% info %}}
A _minimal complete definition_ is a set of methods describing an
abstraction where none of the methods can be derived in terms of the other.
{{% /info %}}

However the `size` function derived above is problematic. It takes
`O(n)` time, where `n` is the size of the foldable. Most data
structures maintains a size that can be obtained in constant time.
Thus, for these data structures using the generalized `size` function incurs a
prohibitively expensive overhead. In practice this means that our
abstracted `size` function, sadly, isn't all too useful. But with the
Fantasy Land specification we can't do better.

{{% info %}}
An abstraction that is unnecessarily costly with regards to
performance is often impractical.
{{% /info %}}

Haskell solves this issue by including a `size` method as part of the
`Foldable` type class. Jabz takes a similar approach by specifying
that foldables must have a `size` method. This means that
implementations of foldable can optionally implement a performant
version of `size`. Alternatively, they can choose to rely on the
default, slower one that Jabz provides.

This is a general trend: where Fantasy Land only contains minimal
complete definitions in the specification, Jabz on the contrary
includes any method that some specific implementations might benefit
from implementing in a specialized way.

## Supported by code

The fact that Jabz specifies a lot more methods than Fantasy Land places
an extra burden on implementations. Therefore these are meant to be
created with support from the library. This makes it very convenient
to implement the abstractions.

Jabz achieves this by offering functions that take classes and ensures
that they have the necessary methods. These functions only require
that some minimal complete definition is present. Beyond that, missing
methods will automatically be filled in with default derived
implementations.

For instance, Jabz requires functors to have both a `map` and a `mapTo`
method. But since `mapTo` can be derived from `map`, an implementation
doesn't have to specify it. A functor can be implemented like this

```javascript
@functor
class MyFunctor {
  ...
  map(f) {
    ...
  }
}
```

The `functor` function ensures that `MyFunctor` satisfies the functor
specification. It automatically installs a default derived `mapTo` on
`MyFunctor`s prototype. Each abstraction in Jabz comes with a matching
function for creating implementations. Using them as a decorators, as
above, looks nice but is of course not required. Decorators are just
fancy syntax for applying functions to classes.

## Monoid with nicely named methods

Fantasy Land monoids must have the two methods `empty` and `concat`.
These names make sense for the list instance of monoid where `empty`
gives the empty list and `concat` does list concatenation. However, for
other instances they are very awkward. One example is the `Max` monoid
whose elements are numbers and where infinity is the identity element
and the merge operation returns the minimum of two numbers. In this
case `empty` is a very counterintuitive name for a function that
returns infinity.

In Jabz the monoid methods are instead called `identity` and
`combine`. These names should be fairly easy to understand while
ensuring that no specific instances of Monoid ends up with
non-intuitive names. The idea is that abstract concepts should have
abstract names.

## Speedy applicatives

If we have a function that takes one argument, we can apply it to a
functor with `map`. However, we can't apply a function that takes `n`
arguments to `n` functors. That is what applicative was made for.

If `f` is a function from three arguments and `a`, `b` and `c` are
applicatives, we can use Fantasy Lands `ap` like this to apply `f` to
the applicatives:

```javascript
c.ap(b.ap(a.map(of(f))));
```

This an awkward way of applying a function to two applicatives. So
we'd probably abstract the pattern into a function called `lift`. It
might work like this:

```javascript
lift(f, a, b, c);
```

However, there is a problem here. Let's say `f` is any function taking
`n` arguments. If we only have the methods `ap` and `of`, there is no
way to apply `f` to `n` applicatives without currying `f` and calling
the curried function `n` times. This hurts performance pretty badly.
In most cases it may not matter. But why have applicatives with an
unnecessary performance overhead?

Unplaced with the situation, Jabz allows applicatives to bring their
own `lift` method. `lift` can be derived, so if they don't they will
be given the default slow one. This has the significant advantage that
for a specific structure it is often easy to implement `lift` so that
the function to lift does not have to be curried and is only applied
once.

To see what the difference can be in practice I've created a small
benchmark that compares lifting a function over Jabz's `Maybe` with
`lift` and with `ap`. [The source code can be found here](https://github.com/Funkia/jabz/blob/master/benchmark/aplift.suite.js).

```bash
-------------------- `ap` vs `lift` on `Maybe` --------------------
lift                        9150491.49 op/s ±  4.45%   (68 samples)
ap                          1665864.27 op/s ±  1.31%   (85 samples)
---------------------------- Best: lift ----------------------------
```

Of course this is a small micro-benchmark but it does show that
lifting a function with `ap` is expensive. Since lifting is pretty
much what applicatives are good for, this means that Jabz applicatives
come with no overhead, whereas Fantasy Land's come with an inherent
slowdown.

## Monads with do-notation

When Haskell began using monads, do-notation was introduced along with
them. The reason is simple: monads are not very convenient to work
with without do-notation. Hence, I believe that in order to make monads
practically useful in JavaScript, we need a substitute for do-notation.
Fortunately, such a thing is possible by using JavaScript generators. I
first saw this brilliant idea in the
library [Fantasy Do](https://github.com/russellmcc/fantasydo). Jabz
implements this and calls it "go-notation"—because `do` is a reserved
word in JavaScript. It might stand for "**G**enerato-d**O**-notation".
With this technique we can get do-notation like this.

```javascript
const value = go(function*() {
  const a = yield someFunctionReturningAMonad(1);
  const b = yield iAlsoReturnAMonad(2);
  return doSomethingWithTheBoundValues(a, b);
});
```

which is comparable to

```haskell
value = do
  a <- someFunctionReturningAMonad(1)
  b <- iAlsoReturnAMonad(2)
  return doSomethingWithTheBoundValues(a, b)
```

So the string "`= yield`" should be read as Haskell's "`<-`".

This form of do-notation is immensely useful. But due to some
unfortunate technical limitations of generators, the `do` function has
to behave very differently for monads that invoke the callback to
`chain` several times and those that only invoke it once. Therefore,
Fantasy Do exports two different functions for these two cases. This
seems like a minor inconvenience, but it breaks the abstraction. A
single application of do-notation can no longer work for all monads as
it should.

Let's say we have an interface for monads with a `random` method. The
`random` method takes two integers and returns, in the monad, a
random integer between the two. Then we might write code like this:

```javascript
function veryRandom(m, n) {
  return do(function*() {
    const a = yield m.random(0, n);
    const b = yield m.random(n, n * n);
    return m.of(a + b);
  });
}
```

The example is fairly silly, but the point is that `veryRandom` should
work for _any_ monad `m` that has a `random` method. One monad that
might implement this is `IO`, which would actually generate a random
variable. Another candidate is the non-determinism monad, aka. the
list monad which would instead return a list of values in the given
range. But since `IO` only calls its `chain` parameter once, and `List`
calls it several times, Fantasy Do would require us to use two
different types of do-notation.

The end result is that code which should work for all monads ends up
only working for some monads. This breaks the abstraction. To fix this,
Jabz simply requires all monads to have a `multi` property. The
property declares whether or not the monad invokes the callback to
`chain` multiple times. This small addition to the specification makes
completely general do-notation possible, which in turn makes monads a
lot more useful.

## Foldable

Foldables in Jabz benefits significantly from the inclusion of more
methods in the specification. But I've talked about that already. So
let's instead look at how Jabz regains some power that was otherwise
lost to the fact that JavaScript isn't lazy.

Consider the aforementioned `find`.

```javascript
function find(predicate, foldable) {
  return foldable.foldr((e, a) => predicate(e) ? just(e) : a, nothing());
}
```

Had we coded this nifty function in Haskell, execution would have
stopped as soon as an element in the foldable satisfying the predicate
had been found. So is the beauty of laziness. JavaScript, on the other
hand, is a bit of a workaholic, so the actual function above would
always iterate over the entire foldable. In many cases, that will be a
lot of wasted effort.

Jabz remedies the situation by adding `shortFoldr` and `shortFoldl` to
its foldable specification. They are like the normal folds except that
the accumulator function has to return a value wrapped in an
`Either`. `right` means "keep going" and `left` means "pull the breaks,
I'm done". Both of these are deriveable, but implementations will have
to implement them to get the benefits of short-circuiting.

This makes it feasible to implement quite a bunch of additional derived
functions compared to what only a strict right fold gives us. Examples
are `find`, `findLast`, `take` and `any`.

Additionally, this also means that infinite data structures can be used
with Jabz's foldable. In fact, Jabz ships with a simple infinite lazy
list.

```javascript
take(5, map((n) => n * n), naturals); //=> [0, 1, 4, 9, 16]
```

Here `naturals` is an infinite list of the natural numbers. First we
square them with `map` and then we take the first five with `take`.
This is possible since `take` utilizes the `shortFoldl` method on
foldables.

## Conclusion

We've covered some of the main differences between Jabz and Fantasy
Land. I hope I've convinced you that Jabz brings some interesting
ideas to the table. Especially in terms of creating low-overhead
abstractions with as many features as one can squeeze out of the them.

Jabz is still far from finished. As a specification Fantasy Land is
more comprehensive. Jabz currently only specifies functor,
applicative, monad, foldable and traversable. And while it does
provide both a healthy set of utility function for working with the
abstractions and some commonly used implementations of the
specification there is still a lot to add. Contributions and feedback
is much appreciated.

The library can [be found on Gitub](https://github.com/Funkia/jabz).
