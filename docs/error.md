
## Common Issues

```
createRoot(...): Target container is not a DOM element.
```

This occurs becaues the node reference is not set at initialization time.

**Problem A**

```
{
    showFeedback && (
    <div ref={kaitakuRef} id='kaitaku-container' style={{
        position: 'absolute',
        top: '50px',
        left: '50px',
        height: '400px',
        width: '400px'
    }} />
    )
}
```

**Solution 1**

```js
 <div ref={kaitakuRef} id='kaitaku-container' style={{
        position: 'absolute',
        top: '50px',
        left: '50px',
        height: '400px',
        width: '400px',
        display: 'none' // hide initially
    }} />
```

**Solution 2**

```js
 useEffect(() => {
     // don't initialize until the ref is available
     if (!kaitakuRef.current) {
         return
     }
    new (window as any).Kaitaku(kaitakuRef.current, {
      onError: (err: any) => {
        console.error(err)
      },
      projectId: projectId,
      token: token,
      userId: user1,
    });
  }, [])
```

**Problem B**

```
Javascript: Cannot set property of undefined; using function as class
```


**Solution**

Make sure classes are instantiated using `new Kaitaku()` instead of `Kaitaku()`.