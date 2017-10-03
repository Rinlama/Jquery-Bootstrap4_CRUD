//declare a object 
var courseService;
var i=1;

function reload(){
    var $table=$("#course-table");
  //  $header=$table.find("tr").first();
   // $table.remove("tr");
   // console.log($header);
   //remove all data before you add
    $table.find("tr:gt(0)").remove();

   var courseList=courseService.getAll();

   $.each(courseList,function(i,c){
        var statusclass=(c.status) ? "table-success" : "table-danger";
        if(c.status){
            c.status="Active";
        }else{
            c.status="Inactive";
        }
        var $table=$("#course-table");
        var $tr=$("<tr class='"+statusclass+"'></tr>");
        console.log(statusclass);
        $tr.append(`<td><input type="checkbox" class="select-all" name="select-all"></td>`);
        $tr.append(`<td>${c.id}</td>`);
        $tr.append(`<td>${c.description}</td>`);
        $tr.append(`<td>${c.name}</td>`);
        $tr.append(`<td>${c.fees}</td>`);
        $tr.append(`<td>${c.duration}</td>`);
        $tr.append(`<td>${c.status}</td>`);
        var edit=`<a href="javascript:void(0)" class='btn btn-success btn-sm edit-course' title="Edit Course" alt="Edit Course" data='${c.id}'> Edit </a>`;
        var remove=`<a href="javascript:void(0)" class='btn btn-danger btn-sm delete-course' title="Edit Delete" alt="Edit Delete" data='${c.id}'> Del </a>`;
        $tr.append(`<td>${edit} ${remove}</td>`);
        $table.append($tr);
   });

   $(".edit-course").on("click",function(){
    $("#course-dialog-title").html("Edit Course");
        var id=$(this).attr("data");
        var course=courseService.getById(id);
        $("#courseName").val(course.name);
        $("#courseDescription").val(course.description);
        $("#courseFees").val(course.fees);
        $("#courseDuration").val(course.duration);
        $("#courseStatus").attr("checked",course.status);
        //preserve a id on DOM
        $("#courseId").val(course.id);
        $("#course-dialog").modal("show");  

});


$(".delete-course").on("click",function(){
    if(confirm("Are you sure to delete ?")){
        var id=$(this).attr("data");
        courseService.delete(id);
        reload();
    }
    return false;


});


}



$(document).ready(function(){
    courseService= new CourseService();
    
    $("#btn-add").on("click",()=>{
        $("#course-dialog-title").html("Add Course");

        $('#course-dialog').modal({
            keyboard:false
        });
    });//btn add end 

    $("#check-all").on("click",function(){
       if($(this).prop("checked")===true){
           $(".select-all").prop("checked",true)
       }else{
        $(".select-all").prop("checked",false)
       }
    });


    $("#btn-save").on("click",function(){
        var course= new Course();
        course.name=$("#courseName").val();
        course.description=$("#courseDescription").val();
        course.fees=$("#courseFees").val();
        course.duration=$("#courseDuration").val();
        course.status=$("#courseStatus").is(":checked");
        //checked edit or add
        if($("#courseId").val()==""){
            course.id=i;
            courseService.add(course);
        }else{
           course.id=$("#courseId").val();
           courseService.edit(course);
        }
        i++;
        $("#courseStatus").attr("checked",false);
        $("#courseId").val("");

        $("#course-form")[0].reset();
        $("#course-dialog").modal("hide");
        //return false becuase we don not want to reload page
        reload();
        return false;
    });




});//ready document end 