<?php
include "../conn.php";

$conn = openCon();
$id = $_GET["id"];
$tempArr = []; 
$sql = "SELECT aa.airline_id, a.name FROM airport_airline aa LEFT JOIN airlines a ON a.id = aa.airline_id WHERE airport_id = " . $id;
$result = $conn->query($sql);
        
if ($result->num_rows > 0) {

    while ($row = $result->fetch_assoc()) {
            
        $arr = array("id" => $row["airport_id"], "name" => $row["name"]);

        array_push($tempArr, $arr);

    }

}

echo json_encode($tempArr);
closeCon($conn);
?>