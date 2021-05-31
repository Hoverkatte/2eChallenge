<?php
include "../conn.php";

$conn = openCon();
$name = $_POST["name"];
$country = $_POST["country"];
$sql = "INSERT INTO airlines (name, country_id) VALUES ('" . $name . "', " . $country . ")";
$checker = $conn->query($sql);

if ($checker === TRUE) {

    $sql = "SELECT a.id AS id, a.name AS name, c.iso AS country FROM airlines a LEFT JOIN countries c ON c.id = a.country_id WHERE a.id = (SELECT max(id) FROM airlines)";
    $result = $conn->query($sql);
    $arr = []; 

    if ($result->num_rows > 0) {

        while ($row = $result->fetch_assoc()) {

            $arr = array("id" => $row["id"], "name" => $row["name"], "country" => $row["country"]);

        }

    }

    echo json_encode($arr);

}

closeCon($conn);
?>