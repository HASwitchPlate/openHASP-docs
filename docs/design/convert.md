# Convert JSONL

- Save a copy of the original code to your computer first, just in case.
- Paste your `jsonl` or `yaml` code into the textarea.
- Click the convert button to replace the old icon codes to the new UTF-16 format.
- Copy/paste the code back to your configuration.

!!! warning

<form action="/">
    <button class="btn bg-primary" type="submit" onclick="convert(); return false;">Convert</button>
    <textarea id="jsonl" style="height: 600px; width: 95%"></textarea>
</form>

<script>
 function convert(){
    let ta = document.getElementById("jsonl");
    let jsonl = ta.value;
    let data = JSON.parse('{"E12C":["DB80","DD2C"],"E140":["DB80","DD40"],"E141":["DB80","DD41"],"E142":["DB80","DD42"],"E143":["DB80","DD43"],"E156":["DB80","DD56"],"E045":["DB80","DC45"],"E04D":["DB80","DC4D"],"E054":["DB80","DC54"],"E05D":["DB80","DC5D"],"E2DC":["DB80","DEDC"],"E374":["DB80","DF74"],"E415":["DB81","DC15"],"E717":["DB81","DF17"],"E60C":["DB81","DE0C"],"E599":["DB81","DD99"],"E5A8":["DB81","DDA8"],"E335":["DB80","DF35"],"E6E8":["DB81","DEE8"],"E50F":["DB81","DD0F"],"E58E":["DB81","DD8E"],"E594":["DB81","DD94"],"F40B":["DB85","DC0B"],"E5A9":["DB81","DDA9"],"E11C":["DB80","DD1C"],"E425":["DB81","DC25"],"E769":["DB81","DF69"],"E81B":["DB82","DC1B"],"F0AF":["DB84","DCAF"],"E81C":["DB82","DC1C"],"E322":["DB80","DF22"],"E6A5":["DB81","DEA5"],"E150":["DB80","DD50"],"F2D4":["DB84","DED4"],"F2D3":["DB84","DED3"],"F11C":["DB84","DD1C"],"F11D":["DB84","DD1D"],"F11E":["DB84","DD1E"],"E10B":["DB80","DD0B"],"E33E":["DB80","DF3E"],"EFC6":["DB83","DFC6"],"F054":["DB84","DC54"],"E70D":["DB81","DF0D"],"E99D":["DB82","DD9D"],"E01B":["DB80","DC1B"],"E026":["DB80","DC26"],"E09A":["DB80","DC9A"],"E30B":["DB80","DF0B"],"E32A":["DB80","DF2A"],"E438":["DB81","DC38"],"EAD7":["DB82","DED7"],"E68A":["DB81","DE8A"],"E4AD":["DB81","DCAD"],"E4AE":["DB81","DCAE"],"E502":["DB81","DD02"],"E0AC":["DB80","DCAC"],"F011":["DB84","DC11"],"E70E":["DB81","DF0E"],"E565":["DB81","DD65"],"EA70":["DB82","DE70"],"E75F":["DB81","DF5F"],"E4B9":["DB81","DCB9"],"E004":["DB80","DC04"],"E2E3":["DB80","DEE3"],"E64A":["DB81","DE4A"],"E9A0":["DB82","DDA0"],"E606":["DB81","DE06"],"F020":["DB84","DC20"],"E8DD":["DB82","DCDD"],"E6B5":["DB81","DEB5"],"E456":["DB81","DC56"],"E457":["DB81","DC57"],"E458":["DB81","DC58"],"F1F3":["DB84","DDF3"],"E49D":["DB81","DC9D"],"E49E":["DB81","DC9E"],"E4C3":["DB81","DCC3"],"EA7A":["DB82","DE7A"],"F1E1":["DB84","DDE1"],"E57E":["DB81","DD7E"],"E91C":["DB82","DD1C"],"E0AF":["DB80","DCAF"],"E493":["DB81","DC93"],"E210":["DB80","DE10"],"E238":["DB80","DE38"],"E3E4":["DB80","DFE4"],"E40A":["DB81","DC0A"],"E4DB":["DB81","DCDB"],"E4DE":["DB81","DCDE"],"E580":["DB81","DD80"],"E72A":["DB81","DF2A"],"E917":["DB82","DD17"],"EAAC":["DB82","DEAC"],"E28F":["DB80","DE8F"],"EC99":["DB83","DC99"],"E95F":["DB82","DD5F"],"E5F1":["DB81","DDF1"],"E9AB":["DB82","DDAB"],"E58C":["DB81","DD8C"],"E176":["DB80","DD76"],"F2BA":["DB84","DEBA"],"E51B":["DB81","DD1B"],"F1DB":["DB84","DDDB"],"E08E":["DB80","DC8E"],"E6A1":["DB81","DEA1"],"E96B":["DB82","DD6B"],"E5FA":["DB81","DDFA"],"E75A":["DB81","DF5A"],"E58F":["DB81","DD8F"],"E6C0":["DB81","DEC0"],"E6C3":["DB81","DEC3"],"F2A3":["DB84","DEA3"],"F2A1":["DB84","DEA1"],"F2A2":["DB84","DEA2"],"E0ED":["DB80","DCED"],"E7AE":["DB81","DFAE"],"E2DA":["DB80","DEDA"],"E1D9":["DB80","DDD9"],"E1FA":["DB80","DDFA"],"EF5F":["DB83","DF5F"]}');
    for (key in data) {
        let search = '\\\\u'+key;
        let searchRegExp = new RegExp(search, 'gi');
        jsonl = jsonl.replaceAll(searchRegExp, '\\u'+data[key][0]+'\\u'+data[key][1]);
    }
    ta.value = jsonl;
 }
</script>