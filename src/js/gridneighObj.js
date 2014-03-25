function gridNeighObj(data){

var dataView;
var grid;

data=   data.nodes.forEach(function(d,i) { d.id = d.id || i; });

var column_keys = d3.keys(data.nodes[0]);
var columns = column_keys.map(function(key,i) {
            return {
                  id: key,
                  name: key,
                  field: key,
                  sortable: true,

                   }
        });




var options = {
  editable: true,
  enableAddRow: true,
  enableCellNavigation: true,
  asyncEditorLoading: true,
  forceFitColumns: false,
  topPanelHeight: 25,
  minWidth:70
};

var sortcol = "Gene.Symbol";
var sortdir = 1;
var percentCompleteThreshold = 0;
var searchString = "";

function requiredFieldValidator(value) {
  if (value == null || value == undefined || !value.length) {
    return {valid: false, msg: "This is a required field"};
  }
  else {
    return {valid: true, msg: null};
  }
}

function myFilter(item, args) {
  if (item["percentComplete"] < args.percentCompleteThreshold) {
    return false;
  }

  if (args.searchString != "" && item["Gene_Symbol"].indexOf(args.searchString) == -1) {
    return false;
  }

  return true;
}

function percentCompleteSort(a, b) {
  return a["percentComplete"] - b["percentComplete"];
}

function comparer(a, b) {
  var x = a[sortcol], y = b[sortcol];
  return (x == y ? 0 : (x > y ? 1 : -1));
}

function toggleFilterRow() {
  grid.setTopPanelVisibility(!grid.getOptions().showTopPanel);
}


$(".grid-header .ui-icon")
        .addClass("ui-state-default ui-corner-all")
        .mouseover(function (e) {
          $(e.target).addClass("ui-state-hover")
        })
        .mouseout(function (e) {
          $(e.target).removeClass("ui-state-hover")
        });


$(function () {

  dataView = new Slick.Data.DataView({ inlineFilters: true });
  grid = new Slick.Grid("#myGrid", dataView, columns, options);
  grid.setSelectionModel(new Slick.RowSelectionModel());

  var pager = new Slick.Controls.Pager(dataView, grid, $("#pager"));
  var columnpicker = new Slick.Controls.ColumnPicker(columns, grid, options);


  // move the filter panel defined in a hidden div into grid top panel
  $("#inlineFilterPanel")
      .appendTo(grid.getTopPanel())
      .show();

  grid.onCellChange.subscribe(function (e, args) {
    dataView.updateItem(args.item.id, args.item);
  });



  grid.onKeyDown.subscribe(function (e) {
    // select all rows on ctrl-a
    if (e.which != 65 || !e.ctrlKey) {
      return false;
    }

    var rows = [];
    for (var i = 0; i < dataView.getLength(); i++) {
      rows.push(i);
    }

    grid.setSelectedRows(rows);
    e.preventDefault();
  });

  grid.onSort.subscribe(function (e, args) {
    sortdir = args.sortAsc ? 1 : -1;
    sortcol = args.sortCol.field;

    if ($.browser.msie && $.browser.version <= 8) {
      // using temporary Object.prototype.toString override
      // more limited and does lexicographic sort only by default, but can be much faster

      var percentCompleteValueFn = function () {
        var val = this["percentComplete"];
        if (val < 10) {
          return "00" + val;
        } else if (val < 100) {
          return "0" + val;
        } else {
          return val;
        }
      };

      // use numeric sort of % and lexicographic for everything else
      dataView.fastSort((sortcol == "percentComplete") ? percentCompleteValueFn : sortcol, args.sortAsc);
    } else {
      // using native sort with comparer
      // preferred method but can be very slow in IE with huge datasets
      dataView.sort(comparer, args.sortAsc);
    }
  });

  // wire up model events to drive the grid
  dataView.onRowCountChanged.subscribe(function (e, args) {
    grid.updateRowCount();
    grid.render();
  });

  dataView.onRowsChanged.subscribe(function (e, args) {
    grid.invalidateRows(args.rows);
    grid.render();
  });

  dataView.onPagingInfoChanged.subscribe(function (e, pagingInfo) {
    var isLastPage = pagingInfo.pageNum == pagingInfo.totalPages - 1;
    var enableAddRow = isLastPage || pagingInfo.pageSize == 0;
    var options = grid.getOptions();

    if (options.enableAddRow != enableAddRow) {
      grid.setOptions({enableAddRow: enableAddRow});
    }
  });


  var h_runfilters = null;

  // wire up the slider to apply the filter to the model
  $("#pcSlider,#pcSlider2").slider({
    "range": "min",
    "slide": function (event, ui) {
      Slick.GlobalEditorLock.cancelCurrentEdit();

      if (percentCompleteThreshold != ui.value) {
        window.clearTimeout(h_runfilters);
        h_runfilters = window.setTimeout(updateFilter, 10);
        percentCompleteThreshold = ui.value;
      }
    }
  });


  // wire up the search textbox to apply the filter to the model
  $("#txtSearch,#txtSearch2").keyup(function (e) {
    Slick.GlobalEditorLock.cancelCurrentEdit();

    // clear on Esc
    if (e.which == 27) {
      this.value = "";
    }

    searchString = (this.value).toUpperCase();
    updateFilter();
  });

  function updateFilter() {
    dataView.setFilterArgs({
      percentCompleteThreshold: percentCompleteThreshold,
      searchString: searchString
    });
    dataView.refresh();
  }

  $("#btnSelectRows").click(function () {
    if (!Slick.GlobalEditorLock.commitCurrentEdit()) {
      return;
    }

    var rows = [];
    for (var i = 0; i < 10 && i < dataView.getLength(); i++) {
      rows.push(i);
    }

    grid.setSelectedRows(rows);
  });


  // initialize the model after all the events have been hooked up
  dataView.beginUpdate();
  dataView.setItems(data.nodes);
  dataView.setFilterArgs({
    percentCompleteThreshold: percentCompleteThreshold,
    searchString: searchString
  });
  dataView.setFilter(myFilter);
  dataView.endUpdate();

  // if you don't want the items that are not visible (due to being filtered out
  // or being on a different page) to stay selected, pass 'false' to the second arg
  dataView.syncGridSelection(grid, true);

var color=""
    dim=""
grid.onClick.subscribe(function(e, args) {

  var item = dataView.getItem(args.row);
      //console.log(dataView.getItem(args.row).Gene_Symbol)
      nom=item.Gene_Symbol
      node.filter(function(d) {
                 if (d.Gene_Symbol == nom){ 


                  return d3.select(this).append("circle")
                                                     .attr('r',function(d){  if (d.FC>0){return(d.FC*5);} else if(d.FC<0){return (d.FC*(-5));} else {return 5}

              
        })
                                             .attr("fill", "yellow")
                              }}).update();
    });


grid.onDblClick.subscribe(function(e, args) {
        var item = dataView.getItem(args.row);
        nom=item.Gene_Symbol
        node.filter(function(d) {
                if (d.Gene_Symbol == nom) return d3.select(this).append("circle")
                                                       .attr('r',function(d){  if (d.FC>0){return(d.FC*5);} else if(d.FC<0){return (d.FC*(-5));} else {return 5}

              
        })
                                                         .attr("fill", function(d) {

              if (d.FC>3 ) {return "#0066FF"} else if (d.FC>2 && d.FC<3){return "#0033CC"} else if (d.FC>1.5 && d.FC<2){return "#000099"}
               else if (d.FC<-3) {return "#FF0000"}   else if (d.FC<-2){return "#FF0044"} else if (d.FC<-1.5){return "#FF0099"}
                else {return "black"} 
              
        }).update();
        })});

node.on("click",function(d){
  //console.log(dataView.getItem(args.row).Gene_Symbol)
  if (searchString===""){
      searchString = (d.Gene_Symbol).toUpperCase();
      } else searchString="";updateFilter();}
    );



  $("#gridContainer").resizable();





})}