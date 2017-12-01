import { Component, Input ,SimpleChanges,OnInit} from '@angular/core';
import {ImageviewerComponent} from 'imageviewer/imageviewer.component';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
    selector: 'patient-image',
    styleUrls: [
      'patient-image.component.css'
    ],
    templateUrl: './patient-image.component.html'
   
})

// Get the study uid, list of series from your input.
// Loop through the series, and push it to the image viewer stack
// Get the first value from the stack, call the loadAndCache for both image

export class PatientImageComponent implements OnInit{

    
	@Input() studyObjectId:String;
	@Input() sopInstanceId:Object[];
	@Input() wadoLoader:boolean;
	
    private seriesList:object;
    private imageIds:Object;
    private valueChange:number = 0;
	constructor(private domSanitizer : DomSanitizer) {
		// this.name = 'Angular2'
		console.log("constructor",this.studyObjectId);
	}
	
	ngOnChanges(changes: SimpleChanges) {
		for (let propName in changes) {
		    let chng = changes[propName];
		    let cur  = JSON.stringify(chng.currentValue);
		    let prev = JSON.stringify(chng.previousValue);
		    if(!cur || cur ==undefined){
		    }
		    else{
		    	this.valueChange = this.valueChange+1;
		    	if(this.valueChange>1){
		    	}
		    	else{
			    this.imageIds = addItemToStacks(this.studyObjectId,this.sopInstanceId);
			   
		    	this.seriesList =$('#studyViewerTemplate').find('.thumbnails')[0];
		    	this.imageViewer = new ImageViewer($('#studyViewerTemplate'), $('#viewportWrapper'));
		    	this.imageViewer.setLayout('1x1');
		    	this.wadoLoader = this.wadoLoader;
		    	
		    		initViewports(this);
			    	resizeStudyViewer(this);
			    	retrieveDataFromStack(this);
			    	displayMasterImage(this);
			    	displaySelectedThumbnail(this);
			    	setupButtons($('#viewer'));
		    	}
		    }
		  }
	}
	
    function addItemToStacks(studyUid:String,objectId:Object){
	    var url = "http://localhost:1337/172.25.242.25/wado/?requestType=WADO&studyUID=";
	    var stack = [];
        objectId.filter(element => {
        	var seriesUid = element.seriesUid;
            var sopUid = element.sopUid;
            var frameCount = element.frameCount;
            if(frameCount>0){
            	stack.push(url+studyUid+"&seriesUID="+seriesUid+"&objectUID="+sopUid+"&contentType=application/dicom");
            }
            else{
            	stack.push(url+studyUid+"&seriesUID="+seriesUid+"&objectUID="+sopUid+"&contentType=image/jpeg");
            }
            
    	 });
        return stack;
    }
    
    function displayImage(thumbnail, image){
        cornerstone.displayImage(thumbnail, image);
    }
   
    function initViewports(object) {
    	object.imageViewer.forEachElement(function(el) {
            cornerstone.enable(el);   
        });            
    }
   
    function retrieveDataFromStack(object){
    	object.imageIds.forEach(function(stack, stackIndex) {
    	
            // Create series thumbnail item
    		var seriesEntry = '<a class="list-group-item" + ' +
            'oncontextmenu="return false"' +
            'id="' + stack + '"' +
            'unselectable="on"' +
            'onselectstart="return false;"' +
            'onmousedown="return false;">' +
            '<div class="csthumbnail" ' +
            'oncontextmenu="return false"' +
            'unselectable="on"' +
            'onselectstart="return false;"' +
            'onmousedown="return false;"></div>' +
            "<div class='text-center small'>" +  '</div></a>';

            // Add to series list
            var seriesElement = $(seriesEntry).appendTo(object.seriesList);

            // Find thumbnail
            var thumbnail = $(seriesElement).find('div')[0];

            // Enable cornerstone on the thumbnail
            cornerstone.enable(thumbnail);
            if (stackIndex === 0) {
                $(seriesElement).addClass('active');
            }
            
            if(stack.endsWith("dicom")){
            	cornerstone.loadImage(stack, displayImage, thumbnail);
            }
            else{
            	cornerstone.loadAndCacheImage(stack, displayImage, thumbnail);
            }
           
            // Handle thumbnail click
            $(seriesElement).on('click touchstart', function() {
               useItemStack(0, stackIndex, object);
            }).data('stack', stackIndex);
        });
    }
    
    function displayMasterImage(object){
    	 if(object.imageIds.length != 0){
            if(object.imageIds[0].endsWith("dicom") == true){
            	cornerstone.loadImage(object.imageIds[0], displayImage, $('#viewport')[0]);
            }
            else{
            	cornerstone.loadAndCacheImage(object.imageIds[0], displayImage, $('#viewport')[0]);
            }
    	 }
    }
    
    function displaySelectedThumbnail(object){
    	var imageId;
    	$("#viewport").unbind();
    	 $('.list-group-item').click(function(){
    		 $('.list-group-item').removeClass('active');
    		 $("#viewport").unbind();
    		 cornerstone.disable($('#viewport')[0]);
    		 this.imageId = $(this).attr('id');
    		 $(this).addClass('active');
    		 cornerstone.enable($('#viewport')[0]);
    		 if(this.imageId.endsWith("dicom")){
             	cornerstone.loadImage(this.imageId, displayImage, $('#viewport')[0]);
             }
             else{
             	cornerstone.loadAndCacheImage(this.imageId, displayImage, $('#viewport')[0]);
             }
    	 });
    }
    function useItemStack(item, stack, object) {
        var element = object.imageViewer.getElement(item);
        if ($(element).data('waiting')) {
            $(element).data('waiting', false);
        }
        $(element).data('useStack', stack);
    }
    
    function resizeStudyViewer(object) {
    	var imageViewerElement = $('#studyViewerTemplate').find('.imageViewer')[0];
    	var parentDiv = $('#studyViewerTemplate').find('.viewer')[0];
        var studyRow = $('#studyViewerTemplate').find('.studyContainer')[0];
        var height = $(studyRow).height();
        var width = $(studyRow).width();
        console.log($(studyRow).innerWidth(),$(studyRow).outerWidth(),$(studyRow).width());
        $(object.seriesList).height("100%");
        $(imageViewerElement).css({height : 540});

        object.imageViewer.forEachElement(function(el, vp) {
            cornerstone.resize(el, true);

            if ($(el).data('waiting')) {
                var ol = vp.find('.overlay-text');
                if (ol.length < 1) {
                    ol = $('<div class="overlay overlay-text">Please drag a stack onto here to view images.</div>').appendTo(vp);
                }
                var ow = vp.width() / 2, oh = vp.height() / 2;
                ol.css({top : oh, left : ow - (ol.width() / 2)}); 
            } 
        });
    }
 
}
