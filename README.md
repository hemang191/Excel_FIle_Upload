<h1>Excel File Upload</h1>
<li>
<ul> This project is implementation of uploading excel file over server .</ul>
<ul> In this project I used worker to run all the upload task to another server </ul>
<ul>User hits the post route on server validation of file and its type is done after it data get stored in S3 bucket from there I fetch a unique key which is assigned to each file during storing the excel file .</ul>
<ul> The key get fetched on worker from messaging queue Redis(bull) is used here as implementation . Pub-sub model based project </ul>
<ul> Data get stored in MongoDB using normalization , for location different schema is made to remove redundancy in Shipment Schema . </ul>
<ul>Also data is stored in postgres , sequlize is used here and migration script are written to create table in data . </ul>
<ul>Unit test cases are written using Mocha and Chai libraries. </ul>
<ul>Frontend is designed using Vue .</ul>

</li>
