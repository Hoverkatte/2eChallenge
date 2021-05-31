<?php
include "../conn.php";

$conn = openCon();
$sql = "SELECT * FROM countries";
$result = $conn->query($sql);
$tempArr = []; 

if ($result->num_rows > 0) {

    while ($row = $result->fetch_assoc()) {

        $arr = array("id" => $row["id"], "name" => $row["name"], "iso" => $row["iso"]);

        array_push($tempArr, $arr);

    }

}

echo json_encode($tempArr);
closeCon($conn);
?>