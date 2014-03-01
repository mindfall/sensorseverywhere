/*
	If you get the following error:
	OverwriteModelError: Cannot overwrite `Animal` model once compiled.
	check to see that there is no animal.js~ file in the models dir
	or any other files that may contain the same schema.
*/

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
    id: Number,
    project_name:String,
    project_description: String,
    project_start_date: Date,
    project_end_date: Date,
    project_amount: Number,
    contribution_amount: Number,
    total_contributions: Number,
    project_image: String,
    project_location: Number
}, {strict: 'true'});


var Project = mongoose.model('Project', ProjectSchema);


function createDefaultProjects(){

    Project.find({}).remove(function() {
      Project.create(
      {
        "id":1,
        "project_name":"Cobaw",
        "project_description":"Connection between Cobaw State forest and Lorri Buttners property",
        "project_start_date":"01/10/13",
        "project_end_date":"02/05/14",
        "project_amount":30000,
        "contribution_amount":"0",
        "total_contributions":0,
        "project_image":"/project_thumbs/1.jpg",
        "project_location":""
      },
      {
        "id":2,
        "project_name":"Byron Bay",
        "project_description":"Private property between beach and highway",
        "project_start_date":"01/10/13",
        "project_end_date":"02/05/14",
        "project_amount":30000,
        "contribution_amount":"0",
        "total_contributions":0,
        "project_image":"/project_thumbs/2.jpg",
        "project_location":""
      },
      {
        "id":3,
        "project_name":"Karratha",
        "project_description":"Marsupial reserve 200km west of Karratha",
        "project_start_date":"01/10/13",
        "project_end_date":"02/05/14",
        "project_amount":50000,
        "contribution_amount":"0",
        "total_contributions":100,
        "project_image":"/project_thumbs/3.jpg",
        "project_location":""
      },
      {
        "id":4,
        "project_name":"Coober Pedy",
        "project_description":"Underground respite for desert dwelling mammals",
        "project_start_date":"01/10/13",
        "project_end_date":"02/05/14",
        "project_amount":120000,
        "contribution_amount":"0",
        "total_contributions":0,
        "project_image":"/project_thumbs/4.jpg",
        "project_location":""
      },
      {
        "id":5,
        "project_name":"Broken Head",
        "project_description":"Marine reserve to protect snapper young from being overfished",
        "project_start_date":"01/10/13",
        "project_end_date":"02/05/14",
        "project_amount":3000,
        "contribution_amount":"0",
        "total_contributions":300,
        "project_image":"/project_thumbs/5.jpg",
        "project_location":""
      },
      {
        "id":6,
        "project_name":"Port Philip Bay",
        "project_description":"Protection of habitat for bay sharks",
        "project_start_date":"01/10/13",
        "project_end_date":"02/05/14",
        "project_amount":600000,
        "contribution_amount":"0",
        "total_contributions":0,
        "project_image":"/project_thumbs/6.jpg",
        "project_location":""
      },
      {
        "id":7,
        "project_name":"Western Desert",
        "project_description":"Western mole monitoring program",
        "project_start_date":"01/10/13",
        "project_end_date":"02/05/14",
        "project_amount":40000,
        "contribution_amount":"0",
        "total_contributions":577,
        "project_image":"/project_thumbs/7.jpg",
        "project_location":""
      },
      {
        "id":8,
        "project_name":"Lennox Head",
        "project_description":"Surfer exclusion zone ",
        "project_start_date":"01/10/13",
        "project_end_date":"02/05/14",
        "project_amount":3400,
        "contribution_amount":"0",
        "total_contributions":764,
        "project_image":"/project_thumbs/8.jpg",
        "project_location":""
      },
      {
        "id":9,
        "project_name":"Blue Sisters",
        "project_description":"Cave maintainance",
        "project_start_date":"01/10/13",
        "project_end_date":"02/05/14",
        "project_amount":76000,
        "contribution_amount":"0",
        "total_contributions":43,
        "project_image":"/project_thumbs/9.jpg",
        "project_location":""
      },
      {
        "id":10,
        "project_name":"Bangalow",
        "project_description":"Fracking action group",
        "project_start_date":"01/10/13",
        "project_end_date":"02/05/14",
        "project_amount":8000,
        "contribution_amount":"0",
        "total_contributions":0,
        "project_image":"/project_thumbs/10.jpg",
        "project_location":""
      },
      {
        "id":11,
        "project_name":"Katherine",
        "project_description":"Purchase of lands for protection against uranium mining",
        "project_start_date":"01/10/13",
        "project_end_date":"02/05/14",
        "project_amount":200000,
        "contribution_amount":"0",
        "total_contributions":0,
        "project_image":"/project_thumbs/11.jpg",
        "project_location":""
      },
      {
        "id":12,
        "project_name":"Kalgoolie",
        "project_description":"Safe dumping of gold tailings",
        "project_start_date":"01/10/13",
        "project_end_date":"02/05/14",
        "project_amount":2000,
        "contribution_amount":"0",
        "total_contributions":0,
        "project_image":"/project_thumbs/12.jpg",
        "project_location":""
      },
        function(){
        console.log('Projects have been created.');
       });
    });

}

exports.createDefaultProjects = createDefaultProjects;