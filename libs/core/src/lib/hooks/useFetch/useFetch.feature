Feature: useFetch hook

Scenario: Testing fetch hook 
  Given the fetch mocked
  Then execute fetch successfully

Scenario: Testing fetch hook if there is a failure while fetching
  Given the fetch mocked
  Then execute fetch and receive expected errors

Scenario: Testing fetch hook and receive a 400 as status
  Given the fetch mocked
  Then execute fetch and receive expected errors