# API Workshop Example
This is an example for Thinc. Club's API Workshop.

---



## Data Format

### `students`
An array containing objects of each student, for example:
```
[{"student_id":"1234567890","name":"StudentName","gender":"Male","is_wearing_glasses":"1","telephone":"1234567890","birthdate":"2016-12-07"}]
```
#### fields
 - `student_id` : (integer) student ID
 - `name` : (string) name
 - `gender` : (string) gender
 - `is_wearing_glasses` : (boolean) indicates whether the student wears glasses or not
 - `telephone` : (string) telephone number
 - `birthdate` : (string) date in the format of `year-month-day`

### `courses`
An array containing objects of each course, for example:
```
[{"course_id":"1","name":"CourseName","credit":"3"}]
```
#### fields
 - `course_id` : (integer) course ID
 - `name` : (string) course name
 - `credit` : (integer) course credit

### `scores`
An array containing objects representing records of scores, for example:
```
[{"course_id":"1","student_id":"1234567890","score":"100"]
```
#### fields
 - `course_id` : (integer) course ID
 - `student_id` : (integer) student ID
 - `score` : (float) score

### additional fields
 - `id` : (integer) unique internal ID used to identify an entry
 - `created_at` : (string) date/time at which the entry was created in the format of `year-month-day hour:minute:second`
 - `updated_at` : (string) latest date/time at which the entry was updated in the format of `year-month-day hour:minute:second`

## API
each table can be accessed via HTTP GET/POST requests:
```
/students
/courses
/scores
```
