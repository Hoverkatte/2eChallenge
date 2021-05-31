<?php
include "../conn.php";

$conn = openCon();

$id = $_POST["id"];
$sql = "DELETE FROM airlines WHERE id = " . $id;

if ($conn->query($sql) === TRUE) {

  echo "Record deleted successfully";

} else {

  echo "Error deleting record: " . $conn->error;

}

closeCon($conn);
?>