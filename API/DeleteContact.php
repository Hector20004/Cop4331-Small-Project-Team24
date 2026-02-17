<?php
	$inData = getRequestInfo();

	$id = $inData["id"];
	$userId = $inData["userId"];

	$conn = new mysqli("localhost", "team24", "WeLoveCOP4331", "COP4331");
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$stmt = $conn->prepare("DELETE FROM Contacts WHERE ID=? and UserID=?");
		$stmt->bind_param("ii", $id, $userId);
		$stmt->execute();

		if($stmt->affected_rows > 0)
		{
			returnWithSuccess("Contact deleted successfully");
		}
		else
		{
			returnWithError("Contact not found");
		}

		$stmt->close();
		$conn->close();
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo json_encode($obj);
	}

	function returnWithError( $err )
	{
		$retValue = array("message" => "", "error" => $err);
		sendResultInfoAsJson( $retValue );
	}

	function returnWithSuccess( $msg )
	{
		$retValue = array("message" => $msg, "error" => "");
		sendResultInfoAsJson( $retValue );
	}

?>
