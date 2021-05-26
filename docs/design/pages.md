<h1>Pages</h1>

The layout of the pages can be defined in several ways:

- by creating a special file on the flash file system, which will be loaded and the layout with the objects displayed each time HASP starts up.
- by issuing commands through MQTT to draw/change the objects immediately

You can create the file wity your favourite text editor and upload it *(and other resource assets like fonts)* using the web interface [HASP Design](../../configuration/hasp) menu.

## pages.jsonl

The location of this file is `/pages.jsonl` in the root of the filesystem. 
It uses the [JSON Lines format](http://www.jsonlines.org) with one json object per line. 
Each line should contain exactly **one** valid json object and end with a line-break `\n` *(not a comma)*.

The jsonl lines are interpreted line-by-line.

When a malformed line is encountered, the processing of the rest of the file stops.    
If you are missing objects, check the logs to see which line was processed last.    
You probably have a typo in the following line which blocks parsing the rest of the file.  
Blank lines are allowed for readability and are ignored.

!!! note "Note"
    The complete file in its entirety is *not* a valid json file.
    Each individual line however must be a valid json object.
    The file extension is `.jsonl` and not `.json`.


!!! note "Note"
    The maximum number of pages and objects is limited by the memory available in the MCU.

    
### File comments

If any of the required `id` or `obj` properties are missing -*and the line is still valid json*- then it is interpreted as a comment.

You can also use the `page` parameter in a comment to set the default page for new objects that don't have a `page` parameter.

Example 1: Add a comment on a single line that is ignored.

```json
{"comment":" ----------- Page 1 layout ------------"}
```

Example 2: Set the default `page` for next object(s) to `3` besides adding a comment as well.

```json
{"page":2,"comment":" ---- My Awesome Color Picker Layout ----"}
```
If you then omit the `page` parameter in the lines below this comment, those objects will appear by default on page `2`.


Example 3: Insert a comment for an object.

```json
{"page":2,"id":3,"obj":"obj","x":40,"y":100,"w":160,"h":160,"radius":100,"opacity":100,"border_opa":160,"border_width":4,"comment":"touch-catcher"}
```

!!! danger ""
    If the line is not valid json, the parsing of the rest of the file is also stopped.



## jsonl command

See [commands documentation](../commands#jsonl) for the `jsonl` command. The payload of the command corresponds to what's exactly in one line of the `pages.jsonl` file above.

## Objects
Each line in `pages.jsonl` creates **one object** on a page and has to be in the json format.  
The order of the objects also dictates the *layer* on the page from bottom to top. So the last drawn object will be the topmpost.

Example Objects:

```json
{"page":1,"id":1,"obj":"label","x":5,"y":5,"h":50,"w":50,"text":"Hello","enabled":true,"hidden":false}
{"page":1,"id":2,"obj":"btn","x":5,"y":90,"h":90,"w":50,"text":"World","enabled":false,"hidden":false}
```

Once the object is created, you can reference it with `pXbY` where `X` is the page number and `Y` is the id of the object.

For example:
```json
p1b1.w=100
p1b2.hidden=true
```

Page number `0` refers to an object visible on all pages.  
An id of `0` refers to the page itself instead of an object.

_Tip:_ If you add the objects on the page 0 last, you ensure that they will be always be visible on top of all other pages.

See [objects documentation](../objects) for details.

## Page attributes

A page can have the following attributes:
 
- `prev` : The number of the destination page when performing a `page prev` action on this page
- `next` : The number of the destination page when performing a `page next` action on this page
- `back` : The number of the destination page when performing a `page back` action on this page

By default all pages cycle in a round-robin fashion (after the last page jump back to first), but you can change this behaviour by adjusting the `prev`, `next` and `back` target pages.

_For example, to limit cycle through page 1-5 only:_

on page 5, `page next` action will jump back to page 1:
```json
{"page":5,"id":0,"next":1}
```
The corresponding command is `p5b0.next=1`.


on page 1, `page prev` action will go to page 5 (instead of default page 12 on an ESP32)
```json
{"page":1,"id":0,"prev":5}
```
The corresponding command is `p1b0.prev=5`.

_Note:_ Page id `p0b0` (as all pages) is not valid to set this attribute as it has to be set on real pages individually. 

`back` acts like a _level up_ action, so you can jump back to the home or menu page where you came from using `page back`. You can create a hierarchy of pages and menus this way.

Check out the [example](../integrations/examples/example-pagination.md) for how to implement a simple pagination bar.  



