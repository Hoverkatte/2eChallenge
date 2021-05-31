<?php
include "../conn.php";

$conn = openCon();
$id = $_GET["id"];
$tempArr = []; 
$sql = "SELECT aa.airport_id, a.name FROM airport_airline aa LEFT JOIN airports a ON a.id = aa.airport_id WHERE airline_id = " . $id;
$result = $conn->query($sql);
        
if ($result->num_rows > 0) {

    while ($row = $result->fetch_assoc()) {
            
        $arr = array("id" => $row["airline_id"], "name" => $row["name"]);

        array_push($tempArr, $arr);

    }

}

echo json_encode($tempArr);
closeCon($conn);
?>