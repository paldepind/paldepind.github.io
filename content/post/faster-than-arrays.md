+++
description = ""
title = "How can List be faster than native arrays?"
date = "2018-05-06T14:25:45+01:00"
categories = []
tags = ["typescript", "javascript", "data-structures"]
draft = false
+++

[List](https://github.com/funkia/list) is an extremely fast immutable
list that can be used as an alternative to native JavaScript arrays.
Since List is immutable it is made for _functional programming_. For
this use case it is often much faster than native JavaScript arrays
and libraries that operate on arrays like Lodash and Ramda.

[Jeremy Likness](https://twitter.com/jeremylikness) recently
[tweeted](https://twitter.com/jeremylikness/status/992394166494814210)
about List (thanks a lot). One of the things he mentioned was the
claim that List is faster than arrays. Several people responded with a
healthy skepticism to this statement. How can something be faster than
arrays which are native to JavaScript and highly optimized by the
JavaScript engines? The short answer is that by exploiting
immutability List can avoid a lot of unnececarry copying through
structural sharing. This blog post will go into more detail and show
how structural sharing leads to huge improvements in performance. 

# The problem with arrays

In functional programming, we never mutate or change our
data-structures. Instead, all operations on data-structures that needs
to change something must return a _new_ version without modifying the
old one. An example of this is the `concat` method on arrays. The code
`arrayA.concat(arrayB)` changes neither `arrayA` nor `arrayB`. It
returns a brand new array.

Arrays are stored in memory as a consequetive sequence of bits.

![Array](/images/array.svg)

Therefore, when a pure function operates on arrays the only thing it
can do in order to return a new array is to _copy the entire array_.
For instance, to append a single element to a list by using `concat`
or Ramda's `append` the entire array that is being appended to must be
copied. As another example, to remove the first element of an array
one can write `array.slice(1)`, use the function `_.initial` from
Lodash, or `R.init` from Ramda. All of these functions make a copy of
the entire slice. If the array is 1000 elements long the code will
construct a brand new array of length 999.

When doing functional programming with arrays a lot of time is wasted
copying arrays all the time. This not only makes our code slower, it
also gives the garbage collector extra work because it has to free all
the memory again. We pay twice.

# How List solves the problem

List is an implementation of an immutable data-structure called
relaxed radix balanced trees. Like most immutable data-structures it
uses a technique called _structural sharing_ to avoid the unnecessary
copying we saw with arrays. Internally a sequence of elements is
stored by List in a format that looks a bit like this.

<!-- {{< figure src="/images/list.svg" title="Steve Francia" height="10em" >}} -->
![Internals of List](/images/list.svg)

One way of looking at the above is that List stores elements in
several small chunks. Whenever we need to create a new list we can
reuse all the chunks that didn't change. This type of reusing is
structural sharing. Arrays, on the other hand, store everything in one
big chunk so it's not possible to use share anything when changing an
array.

If we appended an element to the above list we would get a new list
that, internally, looked something like this.

![List after appending](/images/list-appended.svg)

The dashed boxes represent the new list. Note how everything in the
old list is reused in the new list. This is one part of why List can
perform so well. Appending an element to a list takes essentially the
same time no matter how large a list we're appending to. This can be
seen in benchmarks.

![Append plot](/images/append-plot.png)

Appending an element to an array takes more and more time as the array
gets larger. For List the time is constant. Appending an element to a
list takes the same time on a list of length 10 as it does on a list
of length 10.000.

This performance improving technique applies to a wide range of
operations. Sharing is useful for things such as changing a single
element in a list, inserting elements into a list, concatenating
lists, and slicing a list. The graph below compares the performance of
`slice` between List and arrays.

![Slice plot](/images/slice-plot.png)

Again, every time we want to change something in an array we must make
a copy of the entire array. But, to change something in a list we can
reuse large parts that can be shared between the new and the old list.

Another aspect that makes List faster than native arrays is that many
methods on native arrays are actually quite slow. This applies to
`map`, `filter`, `reduce`, and more. They have a lot of complexity
that slows them down. For instance
[`filter`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
must handle sparse arrays and must accommodate for the filtering
predicate mutating the array during the filter. These things are
required per the JavaScript specification and they slow down native
arrays. The graph below shows the performance of filtering a List
versus filtering an array.

![Filter plot](/images/filter-plot.png)

# Caveats

Even though List is very fast across the board no data-structure can
be the fastest at everything. There are a few operations where List is
slower than native arrays. One of these is random accessing. I.e.
accessing arbitrary elements out of order. But, even in the few cases
where List is behind native arrays, it is not behind by much.

Another caveat is that some functions in List are slower than arrays
for very small lists---even though they scale better to larger lists.
This can be seen in the plot of `slice` above. List's `slice` is a lot
faster on large lists but for small lists, it is slightly slower. This
is something that I'm planning to improve in the future.

# Conclusion

By using structural sharing List can implement a lot of operations in
a way that is much faster than what is possible with arrays. This
means that for most functional use cases using List will be faster
than arrays. However, that is only part of the reason why someone may
use List. Other benefits, that in many cases are more important, are
enforced immutability and the extensive API that List offers.

For more information about List check it out on
[GitHub](https://github.com/funkia/list). For more extensive
benchmarks see the [benchmark
report](https://funkia.github.io/list/benchmarks/).