var ProjectEditPageController = function() {

	var editableProject;
 
    function handleEditPageViewHide()
    {
        $("#cancelButton").die("click", handleCancelEdit);
        $("#cancelBackButton").die("click");
        $("#submitButton").die("click");
        editableAlbum = null;
        
        var docId = $("#projectform").data("identity");
        var pageCache =  $(document.getElementById("_show/project-edit/" + docId));
        pageCache.unbind( "pagehide", handleEditPageViewHide );
        pageCache.empty();
        pageCache.remove();
    }
 
    function handleEditView()
    {
        // Watch for bound hide of page to clear from cache.
        var docId = $("#projectform").data("identity");
        var projectPage = $(document.getElementById("_show/project-edit/" + docId));
        projectPage.bind( "pagehide", handleEditPageViewHide );
    	storeUneditedDocument();
    }
    
    function navigateToProjectPage(docId)
    {
    	$.mobile.changePage("_show/project/" + docId, "slide", true, true);
    }
 
   function storeUneditedDocument()
    {
        var name = $("input#name").val();
        var tags = $("input#tags").val();
        var comments = $("textarea#comments").val();
        editableAlbum = {name:name, tags:tags, comments:comments};
    }
    
    function saveDocument(document)
    {
        $db.saveDoc(document, 
        {
            success: function(response)  
            {
                updateEditableAlbum(document);
                navigateToProjectPage(document._id);
            },
            error: function() 
            {
                alert("Cannot save document: " + document._id);
            }
        });
    }
 
    function updateEditableAlbum( document )
    {
        editableProject.name = document.name;
        editableProject.tags = document.tags;
        editableProject.comments = document.comments;
    }
    
   function revertEdits()
    {
        $("input#name").val(editableProject.name);
        $("input#tags").val(editableProject.tags);
        $("textarea#comments").val( editableProject.comments);
    }
 
    function handleCancelEdit()
    {
        revertEdits();
        var docId = $("projectform").data("identity");
        navigateToProjectPage(docId);
    }   
    
    return {
        initialize: function() 
        {
          	$("#cancelButton").live("click", handleCancelEdit);
	        $("#cancelBackButton").live("click", function(event) 
	        {
	            event.preventDefault();
	            handleCancelEdit();
	            return false;
	        });
	         $("#submitButton").live("click", function(event) 
	         {
                var docId = $("#projectform").data("identity");
                $db.openDoc(docId, {
                    success: function( document ) {
                        document.name = $("input#name").val();
                        document.tags = $("input#tags").val();
                        document.comments = $("textarea#comments").val();
                        saveDocument(document);
                    },
                    error: function()
                    {
                        alert("Can't open document: " + docId );
                    }
                });
            });
            $("div[data-role='page']").live("pageshow", function() 
            {
                $("div[data-role='page']").die("pageshow");
                handleEditView();
            });
        }
    };
}();
 
function handleEditPageReady()
{
    ProjectEditPageController.initialize();
}
$().ready(handleEditPageReady)