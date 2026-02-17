<?php

	$inData = getRequestInfo();

	$conn = new mysqli("localhost", "team24", "WeLoveCOP4331", "COP4331");
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$stmt = $conn->prepare("select ID,FirstName,LastName,Phone,Email,DateCreated from Contacts where (FirstName like ? or LastName like ?) and UserID=?");
		$searchTerm = "%" . $inData["search"] . "%";
		$stmt->bind_param("ssi", $searchTerm, $searchTerm, $inData["userId"]);
		$stmt->execute();

		$result = $stmt->get_result();

		$results = array();
		while($row = $result->fetch_assoc())
		{
			$results[] = array(
				"id" => $row["ID"],
				"firstName" => $row["FirstName"],
				"lastName" => $row["LastName"],
				"phone" => $row["Phone"],
				"email" => $row["Email"],
				"dateCreated" => $row["DateCreated"]
			);
		}

		if( count($results) == 0 )
		{
			returnWithError( "No Records Found" );
		}
		else
		{
			returnWithInfo( $results );
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
		$retValue = array("results" => array(), "message" => "", "error" => $err);
		sendResultInfoAsJson( $retValue );
	}

	function returnWithInfo( $results )
	{
		$retValue = array("results" => $results, "message" => "Contacts retrieved successfully", "error" => "");
		sendResultInfoAsJson( $retValue );
	}

?>
