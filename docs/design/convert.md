# Convert JSONL

- Paste your pages.jsonl into the textarea.
- Click the convert button to replace the old icon codes to the new UTF-16 format.
- Copy/paste the jsonl back onto your plate.

!!! warning
    Save a copy of the original JSONL to your computer first, just in case.

<form action="/">
    <button class="btn bg-primary" type="submit" onclick="convert(); return false;">Convert</button>
    <textarea id="jsonl" style="height: 600px; width: 95%"></textarea>
</form>

<script>
 function convert(){
    let ta = document.getElementById("jsonl");
    let jsonl = ta.value;
    let data = JSON.parse('{"E335":["DB80","DF35"],"E502":["DB81","DD02"],"E95F":["DB82","DD5F"]}');

    for (key in data) {
        let search = '\\\\u'+key;
        console.log(search);
        let searchRegExp = new RegExp(search, 'gi');
        jsonl = jsonl.replaceAll(searchRegExp, '\\u'+data[key][0]+'\\u'+data[key][1]);
    }
    ta.value = jsonl;
 }
</script>