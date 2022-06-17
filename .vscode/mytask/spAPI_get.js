<script language="javascript" type="text/javascript">
var siteUrl;
function getLstItem()
{
    siteUrl = document.getElementById("strsiteURL").value;
    var objClntCntx = new SP.ClientContext(https://kdean.sharepoint.com/sites/Competencies);
    var objList = objClntCntx.get_web().get_lists().getByTitle('CompetencyList');
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml('<View><Query><Where><Eq><FieldRef Name=\'ID\'/><Value Type=\'Number\'>'+document.getElementById("strItemID").value+'</Value></Eq></Where></Query><RowLimit>10</RowLimit></View>');
    this.collListItem = objList.getItems(camlQuery);
    objClntCntx.load(collListItem);
    objClntCntx.executeQueryAsync(Function.createDelegate(this, this.onGetQuerySucceeded), Function.createDelegate(this, this.onGetQueryFailed));
    return false;
}
function onGetQuerySucceeded(sender, args) {
    var listItemInfo = ";
    var listItemEnumerator = collListItem.getEnumerator();
    while (listItemEnumerator.moveNext()) {
        var objListItem = listItemEnumerator.get_current();
        listItemInfo += '\nID: ' + objListItem.get_id() +
            '\nTitle: ' + objListItem.get_item('Title')
             + '\nBody: ' + objListItem.get_item('CompanyName');
        document.getElementById("strTitle").value = objListItem.get_item('Title');
        document.getElementById("strBody").value = objListItem.get_item('CompanyName');
    }
    //alert(listItemInfo.toString());
}
function onGetQueryFailed(sender, args) {
    alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
}
</script>