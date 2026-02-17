<?php
	$inData = getRequestInfo();

	$firstName = $inData["firstName"];
	$lastName = $inData["lastName"];
	$phone = $inData["phone"];
	$email = $inData["email"];
	$userId = $inData["userId"];

	$conn = new mysqli("localhost", "team24", "WeLoveCOP4331", "COP4331");
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$stmt = $conn->prepare("INSERT into Contacts (UserId,FirstName,LastName,Phone,Email) VALUES(?,?,?,?,?)");
		$stmt->bind_param("issss", $userId, $firstName, $lastName, $phone, $email);
		$stmt->execute();
		$stmt->close();
		$conn->close();
		returnWithSuccess("Contact added successfully");
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
