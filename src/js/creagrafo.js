
function creagrafo(data)
{var text="";
            
                
                var graphGenerator = Viva.Graph.generator();
                var graph = Viva.Graph.graph();

                         
 
                    for (var i = 0; i < data.nodes.length; ++i){
                        console.log(data.nodes[i].name)
                        graph.addNode(data.nodes[i].Gene_Symbol);
                    }

                    for (i = 0; i < data.links.length; ++i){
                        var link = data.links[i];
                        graph.addLink(link.source, link.target);
                    }
                

                var layout = Viva.Graph.Layout.forceDirected(graph, {
                   springLength : 30,
                   springCoeff : 0.00000008,
                   dragCoeff : 0.01,
                   gravity : -1.2,
                   theta : 1
                });

                 var nodeColor = 0x009ee8, // hex rrggbb
                nodeSize = 12;



                var graphics = Viva.Graph.View.webglGraphics();

                var circleNode = buildCircleNodeShader();
            graphics.setNodeProgram(circleNode);

            // second, change the node ui model, which can be understood
            // by the custom shader:
            graphics.node(function (node) {
                return new WebglCircle(nodeSize, nodeColor);
             });

           

                var renderer = Viva.Graph.View.renderer(graph,
                    {
                        layout     : layout,
                        graphics   : graphics,
                        renderLinks : true,
                        prerender  : true,
                        container : document.getElementById('webgl')
                
                    });

                var events = Viva.Graph.webglInputEvents(graphics, graph);

               var a=""
                /*events.mouseEnter(function (node) {
                    //console.log('Mouse entered node: ' + node.id);
                }).mouseLeave(function (node) {
                    //console.log('Mouse left node: ' + node.id);
                }).dblClick(function (node) {
                    //console.log('Double click on node: ' + node.id);
                }).click(function (node) { return a=node.id
                        

                //console.log(text);
                    console.log('Single click on node: ' + node.id);});

*/

                renderer.run();}