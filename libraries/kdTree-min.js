/**
 * k-d Tree JavaScript - V 1.01
 *
 * https://github.com/ubilabs/kd-tree-javascript
 *
 * @author Mircea Pricop <pricop@ubilabs.net>, 2012
 * @author Martin Kleppe <kleppe@ubilabs.net>, 2012
 * @author Ubilabs http://ubilabs.net, 2012
 * @license MIT License <http://www.opensource.org/licenses/mit-license.php>
 */ !(function (t, n) {
  "function" == typeof define && define.amd
    ? define(["exports"], n)
    : n("object" == typeof exports ? exports : t)
})(this, function (t) {
  function n(t, n, o) {
    ;(this.obj = t),
      (this.left = null),
      (this.right = null),
      (this.parent = o),
      (this.dimension = n)
  }
  function o(t) {
    ;(this.content = []), (this.scoreFunction = t)
  }
  ;(o.prototype = {
    push: function (t) {
      this.content.push(t), this.bubbleUp(this.content.length - 1)
    },
    pop: function () {
      var t = this.content[0],
        n = this.content.pop()
      return (
        this.content.length > 0 && ((this.content[0] = n), this.sinkDown(0)), t
      )
    },
    peek: function () {
      return this.content[0]
    },
    remove: function (t) {
      for (var n = this.content.length, o = 0; o < n; o++)
        if (this.content[o] == t) {
          var i = this.content.pop()
          return void (
            o != n - 1 &&
            ((this.content[o] = i),
            this.scoreFunction(i) < this.scoreFunction(t)
              ? this.bubbleUp(o)
              : this.sinkDown(o))
          )
        }
      throw new Error("Node not found.")
    },
    size: function () {
      return this.content.length
    },
    bubbleUp: function (t) {
      for (var n = this.content[t]; t > 0; ) {
        var o = Math.floor((t + 1) / 2) - 1,
          i = this.content[o]
        if (!(this.scoreFunction(n) < this.scoreFunction(i))) break
        ;(this.content[o] = n), (this.content[t] = i), (t = o)
      }
    },
    sinkDown: function (t) {
      for (
        var n = this.content.length,
          o = this.content[t],
          i = this.scoreFunction(o);
        ;

      ) {
        var e = 2 * (t + 1),
          r = e - 1,
          l = null
        if (r < n) {
          var u = this.content[r],
            h = this.scoreFunction(u)
          h < i && (l = r)
        }
        if (e < n) {
          var s = this.content[e]
          this.scoreFunction(s) < (null == l ? i : h) && (l = e)
        }
        if (null == l) break
        ;(this.content[t] = this.content[l]), (this.content[l] = o), (t = l)
      }
    },
  }),
    (t.kdTree = function (t, i, e) {
      function r(t, o, i) {
        var l,
          u,
          h = o % e.length
        return 0 === t.length
          ? null
          : 1 === t.length
          ? new n(t[0], h, i)
          : (t.sort(function (t, n) {
              return t[e[h]] - n[e[h]]
            }),
            (l = Math.floor(t.length / 2)),
            (u = new n(t[l], h, i)),
            (u.left = r(t.slice(0, l), o + 1, u)),
            (u.right = r(t.slice(l + 1), o + 1, u)),
            u)
      }
      var l = this
      Array.isArray(t)
        ? (this.root = r(t, 0, null))
        : (function (t) {
            function n(t) {
              t.left && ((t.left.parent = t), n(t.left)),
                t.right && ((t.right.parent = t), n(t.right))
            }
            ;(l.root = t), n(l.root)
          })(t),
        (this.toJSON = function (t) {
          t || (t = this.root)
          var o = new n(t.obj, t.dimension, null)
          return (
            t.left && (o.left = l.toJSON(t.left)),
            t.right && (o.right = l.toJSON(t.right)),
            o
          )
        }),
        (this.insert = function (t) {
          function o(n, i) {
            if (null === n) return i
            var r = e[n.dimension]
            return t[r] < n.obj[r] ? o(n.left, n) : o(n.right, n)
          }
          var i,
            r,
            l = o(this.root, null)
          null !== l
            ? ((i = new n(t, (l.dimension + 1) % e.length, l)),
              (r = e[l.dimension]),
              t[r] < l.obj[r] ? (l.left = i) : (l.right = i))
            : (this.root = new n(t, 0, null))
        }),
        (this.remove = function (t) {
          function n(o) {
            if (null === o) return null
            if (o.obj === t) return o
            var i = e[o.dimension]
            return t[i] < o.obj[i] ? n(o.left, o) : n(o.right, o)
          }
          function o(t) {
            function n(t, o) {
              var i, r, l, u, h
              return null === t
                ? null
                : ((i = e[o]),
                  t.dimension === o
                    ? null !== t.left
                      ? n(t.left, o)
                      : t
                    : ((r = t.obj[i]),
                      (l = n(t.left, o)),
                      (u = n(t.right, o)),
                      (h = t),
                      null !== l && l.obj[i] < r && (h = l),
                      null !== u && u.obj[i] < h.obj[i] && (h = u),
                      h))
            }
            var i, r, u
            if (null === t.left && null === t.right)
              return null === t.parent
                ? void (l.root = null)
                : ((u = e[t.parent.dimension]),
                  void (t.obj[u] < t.parent.obj[u]
                    ? (t.parent.left = null)
                    : (t.parent.right = null)))
            null !== t.right
              ? ((r = (i = n(t.right, t.dimension)).obj), o(i), (t.obj = r))
              : ((r = (i = n(t.left, t.dimension)).obj),
                o(i),
                (t.right = t.left),
                (t.left = null),
                (t.obj = r))
          }
          var i
          null !== (i = n(l.root)) && o(i)
        }),
        (this.nearest = function (t, n, r) {
          function u(o) {
            function r(t, o) {
              f.push([t, o]), f.size() > n && f.pop()
            }
            var l,
              h,
              s,
              c,
              a = e[o.dimension],
              g = i(t, o.obj),
              p = {}
            for (c = 0; c < e.length; c += 1)
              c === o.dimension ? (p[e[c]] = t[e[c]]) : (p[e[c]] = o.obj[e[c]])
            ;(h = i(p, o.obj)),
              null !== o.right || null !== o.left
                ? (u(
                    (l =
                      null === o.right
                        ? o.left
                        : null === o.left
                        ? o.right
                        : t[a] < o.obj[a]
                        ? o.left
                        : o.right)
                  ),
                  (f.size() < n || g < f.peek()[1]) && r(o, g),
                  (f.size() < n || Math.abs(h) < f.peek()[1]) &&
                    null !== (s = l === o.left ? o.right : o.left) &&
                    u(s))
                : (f.size() < n || g < f.peek()[1]) && r(o, g)
          }
          var h, s, f
          if (
            ((f = new o(function (t) {
              return -t[1]
            })),
            r)
          )
            for (h = 0; h < n; h += 1) f.push([null, r])
          for (
            l.root && u(l.root), s = [], h = 0;
            h < Math.min(n, f.content.length);
            h += 1
          )
            f.content[h][0] && s.push([f.content[h][0].obj, f.content[h][1]])
          return s
        }),
        (this.balanceFactor = function () {
          function t(n) {
            return null === n ? 0 : Math.max(t(n.left), t(n.right)) + 1
          }
          function n(t) {
            return null === t ? 0 : n(t.left) + n(t.right) + 1
          }
          return t(l.root) / (Math.log(n(l.root)) / Math.log(2))
        })
    }),
    (t.BinaryHeap = o)
})
