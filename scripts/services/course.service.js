function CourseService(){
    this.courseList=[];

    this.add=function(course){
        this.courseList.push(course);
        console.log(this.courseList);
    }
    this.getAll=function(){
        return this.courseList;
    }
    this.getById=function(id){
        for(var i=0;i<this.courseList.length;i++){
            var course=this.courseList[i];
            if (course.id==id){
                return course;
            }
        }
        return null;
    }
    this.delete=function(id){
        for(var i=0;i<this.courseList.length;i++){
            var course=this.courseList[i];
            if(course.id==id){
                this.courseList.splice(i,1);
                return true;
            }
        };
        return false;
    }

    this.edit=function(c){
        for(var i=0;i<this.courseList.length;i++){
            var course=this.courseList[i];
            if(course.id==c.id){
                this.courseList[i]=c;
            }
        };
    }


}