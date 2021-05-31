<?php
include "../conn.php";

$conn = openCon();
$sql = "SELECT a.id AS id, a.name AS name, a.latitude AS latitude, a.longitude AS longitude, a.country_id AS countryID, c.name AS countryName, c.iso AS countryISO FROM airports a LEFT JOIN countries c ON c.id = a.country_id";
$result = $conn->query($sql);
$tempArr = []; 

if ($result->num_rows > 0) {

    while ($row = $result->fetch_assoc()) {
    
        $arr = array("id" => $row["id"], "name" => $row["name"], "latitude" => $row["latitude"], "longitude" => $row["longitude"], "countryID" => $row["countryID"], "countryName" => $row["countryName"], "countryISO" => $row["countryISO"]);

        array_push($tempArr, $arr);

    }

}

echo json_encode($tempArr);
closeCon($conn);
?>