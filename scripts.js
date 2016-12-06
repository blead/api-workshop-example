/* variables */
const MOCK_DATA = {
  Students: [
    {id: 1234567890, name: 'John Doe', gender: 'male', isWearingGlasses: true, telephone: '1234567890', birthdate: null},
    {id: 5678901234, name: 'Jane Doe', gender: 'female', isWearingGlasses: false, telephone: '5678901234', birthdate: null},
    {id: 3456789012, name: 'Nomen Nescio', gender: 'unknown', isWearingGlasses: true, telephone: '7878787878', birthdate: null}
  ],
  Courses: [
    {id: 0, name: 'Alpha', credit: 1},
    {id: 1, name: 'Beta', credit: 2},
    {id: 2, name: 'Gamma', credit: 2},
    {id: 3, name: 'Delta', credit: 1}
  ],
  Scores: [
    {studentId: 1234567890, courseId: 0, score: 42},
    {studentId: 1234567890, courseId: 1, score: 50},
    {studentId: 1234567890, courseId: 2, score: 14},
    {studentId: 1234567890, courseId: 3, score: 80},
    {studentId: 5678901234, courseId: 0, score: 60},
    {studentId: 5678901234, courseId: 1, score: 72},
    {studentId: 5678901234, courseId: 2, score: 95},
    {studentId: 5678901234, courseId: 3, score: 21},
    {studentId: 3456789012, courseId: 0, score: 78},
    {studentId: 3456789012, courseId: 1, score: 87},
    {studentId: 3456789012, courseId: 2, score: 77},
    {studentId: 3456789012, courseId: 3, score: 88}
  ]
};

const MARGIN = {top: 50, right: 50, bottom: 50, left: 50},
      WIDTH = 960,
      HEIGHT = 500;

var margin = MARGIN,
    width = WIDTH,
    height = HEIGHT,
    calculatedWidth = width - margin.left - margin.right,
    calculatedHeight = height - margin.top - margin.bottom;
var x = d3.scale.ordinal().rangePoints([0, calculatedWidth]),
    y = d3.scale.linear().range([calculatedHeight, 0]),
    color = d3.scale.category20(),
    xAxis = d3.svg.axis().scale(x).orient('bottom'),
    yAxis = d3.svg.axis().scale(y).orient('left'),
    svg = d3.select('body').append('svg').attr('width', width).attr('height', height).append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


/* main */
// TODO: replace mockRequest() with request() 
$.when( mockRequest('GET','Students',null), mockRequest('GET','Courses',null), mockRequest('GET','Scores',null) ).done( (students, courses, scores) => {
  draw(join(students[0],courses[0],scores[0]),'first digit of telephone number','score', d => d.student.telephone.substr(0,1) , d => d.score , d => d.course.name);
  // draw(join(students[0],courses[0],scores[0]),'last digit of telephone number','score', d => d.student.telephone.substr(-1,1) , d => d.score , d => d.course.name);
  // draw(join(students[0],courses[0],scores[0]),'first character of name','score', d => d.student.name.substr(0,1) , d => d.score , d => d.course.name);
  // draw(join(students[0],courses[0],scores[0]),'last character of name','score', d => d.student.name.substr(-1,1) , d => d.score , d => d.course.name);
});


/* functions */
function request(method,url,args,callback) {
  return $.ajax({
    method: method,
    url: url,
    data: args,
    success: callback
  });
}

function mockRequest(method,url,args,callback) {
  return $.Deferred(callback).resolve([MOCK_DATA[url],'success',null]);
}

function join(students,courses,scores) {
  var studentsIndex = {},
      coursesIndex = {};
  $.each(students, (index,student) => {
    studentsIndex[student.id] = student;
  });
  $.each(courses, (index,course) => {
    coursesIndex[course.id] = course;
  });
  return $.map(scores, (score) => {
    return {student: studentsIndex[score.studentId], course: coursesIndex[score.courseId], score: score.score}
  });
}

/* 
 * data: data to draw -> array of objects, specifically created from join()
 * labelX, labelY: label of X, Y axes
 * reducerX, reducerY, colorReducer: reducer function for each axis and plot colors
*/
function draw(data,labelX,labelY,reducerX,reducerY,colorReducer) {
  x.domain(data.map(reducerX).filter( (element, index, array) => index === array.indexOf(element) ).sort());
  y.domain(d3.extent(data,reducerY)).nice();

  svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + calculatedHeight + ')')
      .call(xAxis)
    .append('text')
      .attr('class', 'label')
      .attr('x', calculatedWidth)
      .attr('y', -6)
      .style('text-anchor', 'end')
      .text(labelX);

  svg.append('g')
      .attr('class', 'y axis')
      .call(yAxis)
    .append('text')
      .attr('class', 'label')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .text(labelY);

  svg.selectAll('.dot')
      .data(data)
    .enter().append('circle')
      .attr('class', 'dot')
      .attr('r', 3.5)
      .attr('cx', d => x(reducerX(d)) )
      .attr('cy', d => y(reducerY(d)) )
      .style('fill', d => color(colorReducer(d)) );

  var legend = svg.selectAll('.legend')
      .data(color.domain())
    .enter().append('g')
      .attr('class', 'legend')
      .attr('transform', (d, i) => 'translate(0,' + i * 20 + ')' );

  legend.append('rect')
      .attr('x', calculatedWidth - 24)
      .attr('width', 18)
      .attr('height', 18)
      .style('fill', color);

  legend.append('text')
      .attr('x', calculatedWidth - 30)
      .attr('y', 9)
      .attr('dy', '.35em')
      .style('text-anchor', 'end')
      .text( d => d );
}

function clear() {
  svg.selectAll('*').remove();
}
